import jwt from 'jsonwebtoken';
import { Admin } from '../models/Admin.js';
import { env } from '../config/env.js';

export const loginAdmin = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both username/email and password.'
      });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [
        { email: cleanIdentifier },
        { username: cleanIdentifier }
      ]
    });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    // Compare bcrypt hash
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials.'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Sign JWT token using validated environment secret
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role
      },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Authentication successful.',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Error during admin login:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred during authentication.'
    });
  }
};

export const getMe = async (req, res) => {
  try {
    return res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve admin details.'
    });
  }
};

