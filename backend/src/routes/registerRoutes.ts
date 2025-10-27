import express, { Request, Response } from 'express';
import { registerUser, loginUser, getUsers, getUserById, getRelatedProfiles } from '../controllers/registerController';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers); 
router.get('/users/:id', getUserById);
router.get('/related/:country/:id', getRelatedProfiles);

export default router;
