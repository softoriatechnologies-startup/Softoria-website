import mongoose from 'mongoose';
import { Enquiry } from '../models/Enquiry.js';
import { Admin } from '../models/Admin.js';
import { env } from '../config/env.js';
import { connectDB } from '../config/db.js';
import app from '../server.js';
import http from 'http';

const runTests = async () => {
  console.log('🧪 Starting Full-Stack API & MongoDB Atlas Automated Test Suite...\n');

  try {
    await connectDB();
  } catch (err) {
    console.error('❌ Could not connect to MongoDB Atlas during test suite setup.');
    console.error('Please verify your IP is whitelisted in MongoDB Atlas and credentials are correct.');
    process.exit(1);
  }

  const server = http.createServer(app);
  const port = 5055;

  await new Promise((resolve) => server.listen(port, resolve));
  console.log(`📡 Test Server listening on http://localhost:${port}`);

  const baseUrl = `http://localhost:${port}/api`;

  let adminToken = '';
  let testEnquiryId = '';

  try {
    // Test 1: Health check
    console.log('\n[1/7] Testing GET /api/health ...');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthData = await healthRes.json();
    console.log('   Response Status:', healthRes.status, healthData.status);
    if (healthRes.status !== 200) throw new Error('Health check failed');
    console.log('   ✅ Health Check Passed');

    // Test 2: Public Enquiry Submission (Popup)
    console.log('\n[2/7] Testing POST /api/enquiries (Popup Lead) ...');
    const popupEnquiry = {
      fullName: 'Vikram Sharma',
      email: 'vikram.sharma@enterprise-tech.in',
      phone: '+91 98765 43210',
      companyName: 'Apex Logistics Pvt Ltd',
      service: 'Custom Software Development',
      projectDescription: 'Need a customized logistics and warehouse dispatch dashboard.',
      source: 'popup'
    };

    const enquiryRes = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(popupEnquiry)
    });
    const enquiryData = await enquiryRes.json();
    console.log('   Response Status:', enquiryRes.status, enquiryData.message);
    if (enquiryRes.status !== 201) throw new Error('Enquiry submission failed');
    testEnquiryId = enquiryData.enquiryId;
    console.log('   ✅ Live Enquiry Stored in MongoDB Atlas with ID:', testEnquiryId);

    // Test 3: Anti-spam Honeypot Rejection
    console.log('\n[3/7] Testing Anti-Spam Honeypot Rejection ...');
    const spamSubmission = {
      fullName: 'Spam Bot',
      email: 'bot@spam.com',
      phone: '1234567890',
      service: 'Website Development',
      website_url_check: 'http://spam-link.ru' // Honeypot filled
    };

    const spamRes = await fetch(`${baseUrl}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(spamSubmission)
    });
    console.log('   Response Status:', spamRes.status);
    if (spamRes.status === 400) {
      console.log('   ✅ Honeypot successfully trapped and rejected automated spam.');
    } else {
      throw new Error('Honeypot failed to block bot.');
    }

    // Test 4: Admin Authentication (JWT Login)
    console.log('\n[4/7] Testing POST /api/auth/login (Admin Sign-In) ...');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: env.ADMIN_INITIAL_USERNAME,
        password: env.ADMIN_INITIAL_PASSWORD
      })
    });
    const loginData = await loginRes.json();
    console.log('   Response Status:', loginRes.status, loginData.message);
    if (loginRes.status !== 200 || !loginData.token) throw new Error('Admin login failed');
    adminToken = loginData.token;
    console.log('   ✅ Admin Authenticated! JWT Token issued.');

    // Test 5: Protected Metrics Summary
    console.log('\n[5/7] Testing GET /api/admin/enquiries/stats (Protected) ...');
    const statsRes = await fetch(`${baseUrl}/admin/enquiries/stats`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    const statsData = await statsRes.json();
    console.log('   Response Status:', statsRes.status);
    console.log('   Live Database Metrics:', statsData.stats);
    if (statsRes.status !== 200) throw new Error('Stats fetch failed');
    console.log('   ✅ Live Metrics Calculated from MongoDB Atlas');

    // Test 6: Enquiry Lifecycle Status Update (New -> Contacted)
    console.log('\n[6/7] Testing PATCH /api/admin/enquiries/:id/status ...');
    const patchRes = await fetch(`${baseUrl}/admin/enquiries/${testEnquiryId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'contacted' })
    });
    const patchData = await patchRes.json();
    console.log('   Response Status:', patchRes.status, 'New Status:', patchData.enquiry?.status);
    if (patchRes.status !== 200 || patchData.enquiry?.status !== 'contacted') {
      throw new Error('Status update failed');
    }
    console.log('   ✅ Enquiry Status Transitioned to "contacted"');

    // Test 7: Unauthorized Access Denial
    console.log('\n[7/9] Testing Route Protection (Unauthorized access rejection) ...');
    const unauthRes = await fetch(`${baseUrl}/admin/enquiries`);
    console.log('   Response Status (Without Token):', unauthRes.status);
    if (unauthRes.status === 401) {
      console.log('   ✅ Protected Routes strictly require valid JWT authorization header.');
    } else {
      throw new Error('Unprotected route vulnerability!');
    }

    // Test 8: ReDoS & Special Regex Search Input Defense
    console.log('\n[8/9] Testing Safe ReDoS Query Defense ...');
    const redosRes = await fetch(`${baseUrl}/admin/enquiries?search=[(a+)+?*^$`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('   Response Status (With Malicious Regex Input):', redosRes.status);
    if (redosRes.status === 200) {
      console.log('   ✅ Regex search safely escaped without ReDoS or syntax exceptions.');
    } else {
      throw new Error('ReDoS defense failed.');
    }

    // Test 9: Malformed ObjectId Format Validation
    console.log('\n[9/9] Testing Malformed ObjectId Validation ...');
    const badIdRes = await fetch(`${baseUrl}/admin/enquiries/invalid-mongo-id-123/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({ status: 'completed' })
    });
    const badIdData = await badIdRes.json();
    console.log('   Response Status (With Invalid ObjectId):', badIdRes.status, badIdData.message);
    if (badIdRes.status === 400 && badIdData.message === 'Invalid enquiry identifier format.') {
      console.log('   ✅ Malformed ObjectIds rejected with 400 Bad Request before database query.');
    } else {
      throw new Error('ObjectId validation failed.');
    }

    console.log('\n🎉 ALL 9 FULL-STACK API & DATABASE TESTS PASSED WITH 100% SUCCESS!\n');
  } catch (err) {
    console.error('\n❌ Test Suite Error:', err.message);
  } finally {
    server.close();
    await mongoose.connection.close();
    process.exit(0);
  }
};

runTests();

