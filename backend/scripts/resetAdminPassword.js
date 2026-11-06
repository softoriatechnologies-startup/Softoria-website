import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { Admin } from '../models/Admin.js';
import { connectDB } from '../config/db.js';

/**
 * Dedicated Secure Administrator Password Reset Procedure
 * 
 * Usage:
 *   ADMIN_RESET_IDENTIFIER="admin@softoria.com" ADMIN_NEW_PASSWORD="yourNewSecurePassword" node scripts/resetAdminPassword.js
 */
const resetAdminPassword = async () => {
  console.log('🔄 Initializing Softoria Admin Password Reset Engine...');

  const identifier = process.env.ADMIN_RESET_IDENTIFIER;
  const newPassword = process.env.ADMIN_NEW_PASSWORD;

  if (!identifier || identifier.trim() === '') {
    console.error('❌ ERROR: ADMIN_RESET_IDENTIFIER environment variable is missing.');
    console.error('Please specify ADMIN_RESET_IDENTIFIER in your environment before running this reset utility.');
    process.exit(1);
  }

  if (!newPassword || newPassword.trim().length < 12) {
    console.error('❌ ERROR: ADMIN_NEW_PASSWORD environment variable is missing or shorter than 12 characters.');
    console.error('Please specify ADMIN_NEW_PASSWORD with at least 12 characters in your environment.');
    process.exit(1);
  }

  try {
    await connectDB();

    const cleanIdentifier = identifier.trim().toLowerCase();
    const admin = await Admin.findOne({
      $or: [{ email: cleanIdentifier }, { username: cleanIdentifier }]
    });

    if (!admin) {
      console.error(`❌ Admin account "${identifier}" was not found in softoria_technologies database.`);
      await mongoose.connection.close();
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(12);
    admin.passwordHash = await bcrypt.hash(newPassword, salt);
    await admin.save();

    console.log('====================================================');
    console.log(`✅ Password successfully reset for administrator: ${admin.username} (${admin.email})`);
    console.log('   Database: softoria_technologies');
    console.log('====================================================');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during administrator password reset:', error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

resetAdminPassword();

