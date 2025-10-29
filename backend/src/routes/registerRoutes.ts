import express from 'express';
import multer from 'multer';
import path from 'path';

import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  getRelatedProfiles,
  updateUserProfile,
  deleteUserProfile
} from '../controllers/registerController';

import { serveProfilePhoto } from '../controllers/profilePhotoController';

const router = express.Router();

// 📸 Multer config (store files in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save uploads into the `src/uploads` folder so it matches server static path
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// 🧩 Routes
router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/related/:id', getRelatedProfiles);
router.put('/update/:id', upload.single('profilePhoto'), updateUserProfile);
router.delete('/users/:id', deleteUserProfile);

// Serve profile photo with blur for non-premium/guest
router.get('/profile-photo/:filename', serveProfilePhoto);


export default router;
