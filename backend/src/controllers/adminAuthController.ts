import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Hardcoded admin credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'admin123@gmail.com';

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Create JWT token for admin
      const token = jwt.sign(
        { isAdmin: true, username: ADMIN_USERNAME },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Admin login successful',
        token,
        admin: {
          username: ADMIN_USERNAME,
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};