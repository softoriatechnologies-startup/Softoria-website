import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const validateEnv = () => {
  const missing = [];

  // Required critical variables
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.trim() === '') {
    missing.push('MONGODB_URI');
  }

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    missing.push('JWT_SECRET');
  }

  if (missing.length > 0) {
    console.error('❌ FATAL CONFIGURATION ERROR: Missing required environment variable(s):');
    missing.forEach((v) => console.error(`   - ${v}`));
    console.error('Please configure them in your backend/.env file before starting the server.\n');
    process.exit(1);
  }

  // Sanity check on JWT_SECRET strength
  if (process.env.JWT_SECRET.length < 16) {
    console.warn('⚠️ WARNING: JWT_SECRET should be at least 16 characters for cryptographic security.');
  }

  return {
    PORT: parseInt(process.env.PORT, 10) || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI.trim(),
    JWT_SECRET: process.env.JWT_SECRET.trim(),
    FRONTEND_URL: process.env.FRONTEND_URL ? process.env.FRONTEND_URL.trim() : 'http://localhost:5173',
    ADMIN_INITIAL_USERNAME: process.env.ADMIN_INITIAL_USERNAME || 'softoria_admin',
    ADMIN_INITIAL_EMAIL: process.env.ADMIN_INITIAL_EMAIL || 'admin@softoria.com',
    ADMIN_INITIAL_PASSWORD: process.env.ADMIN_INITIAL_PASSWORD || ''
  };
};

export const env = validateEnv();

