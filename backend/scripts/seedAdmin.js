import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { connectDB } from '../config/db.js';
import { env } from '../config/env.js';

const seedInitialAdmin = async () => {
  console.log('🔄 Initializing Softoria Admin Seed Engine...');

  try {
    await connectDB();
  } catch (err) {
    console.error('❌ Could not connect to database. Please check your MONGODB_URI.');
    process.exit(1);
  }

  const username = env.ADMIN_INITIAL_USERNAME;
  const email = env.ADMIN_INITIAL_EMAIL;
  const password = env.ADMIN_INITIAL_PASSWORD;

  if (!password || password.trim() === '') {
    console.error('❌ ERROR: ADMIN_INITIAL_PASSWORD is not set in backend/.env.');
    console.error('Please configure ADMIN_INITIAL_PASSWORD before running the seed script.');
    process.exit(1);
  }

  try {
    const existing = await Admin.findOne({
      $or: [{ username }, { email }]
    });

    if (existing) {
      console.log(`ℹ️ Admin account "${existing.username}" (${existing.email}) already exists in the database.`);
      await mongoose.connection.close();
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      username,
      email,
      passwordHash,
      role: 'superadmin'
    });

    console.log('====================================================');
    console.log('✅ Softoria Administrator Created Successfully!');
    console.log(`   Username: ${newAdmin.username}`);
    console.log(`   Email:    ${newAdmin.email}`);
    console.log(`   Role:     ${newAdmin.role}`);
    console.log('====================================================');
    console.log('👉 Please store these credentials securely and update the password after first login.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedInitialAdmin();
