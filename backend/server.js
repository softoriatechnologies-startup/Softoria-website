import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { fileURLToPath } from 'url';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Security Middlewares
app.use(helmet());

// CORS Configuration — supports local development, verified Netlify production, and normalized FRONTEND_URL
const normalizeOrigin = (url) => (url ? url.trim().replace(/\/+$/, '') : '');

const frontendUrls = (env.FRONTEND_URL || '')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://cheerful-chimera-830f66.netlify.app',
  ...frontendUrls
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const cleanOrigin = normalizeOrigin(origin);
      if (allowedOrigins.includes(cleanOrigin)) {
        return callback(null, true);
      }

      // Disallow origin cleanly without throwing unhandled 500 error
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Body Parser with strict payload limits
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Sanitize inputs against NoSQL query injection
app.use(mongoSanitize());

// General rate limiter for all /api routes
app.use('/api', generalLimiter);

// Server Root Status
app.get('/', (req, res) => {
  res.json({
    service: 'Softoria Technologies Backend API',
    status: 'online',
    environment: env.NODE_ENV,
    endpoints: {
      health: '/api/health',
      enquiries: '/api/enquiries',
      auth: '/api/auth/login'
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Softoria Technologies API Engine'
  });
});

// Mount API Routes
app.use('/api', enquiryRoutes);
app.use('/api/auth', authRoutes);

// Catch-all 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.originalUrl} does not exist.`
  });
});

// Central Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server after verifying database connection when run directly
export const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Softoria Technologies Backend Server running on http://localhost:${env.PORT}`);
    });
    return server;
  } catch (error) {
    console.error('❌ Failed to start backend server due to database connection error.');
    process.exit(1);
  }
};

const isMainModule = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMainModule) {
  startServer();
}

export default app;
