import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { RegisterUser } from '../models/registerUser';

// Middleware to serve profile photos with blur for non-premium/guest
export const serveProfilePhoto = async (req: Request, res: Response) => {
  const { filename } = req.params;
  let user: any = null;
  let isPremium = false;

  // Check for auth header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      // You may need to use your JWT_SECRET here
      const decoded: any = require('jsonwebtoken').verify(token, process.env.JWT_SECRET || 'secret');
      user = await RegisterUser.findByPk(decoded.id);
      isPremium = user?.isPremium;
    } catch (e) {
      // Invalid token, treat as guest
    }
  }

  const imgPath = path.join(__dirname, '../uploads', filename);
  if (!fs.existsSync(imgPath)) {
    return res.status(404).send('Image not found');
  }

  // Serve clear image for premium, blurred for others
  if (isPremium) {
    return res.sendFile(imgPath);
  } else {
    // Blur image using sharp (reduced radius for less strong blur)
    try {
      const blurred = await sharp(imgPath).blur(6).toBuffer();
      res.set('Content-Type', 'image/jpeg');
      return res.send(blurred);
    } catch (err) {
      return res.status(500).send('Error processing image');
    }
  }
};
