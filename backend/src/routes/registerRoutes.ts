import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  getRelatedProfiles,
  updateUserProfile
} from '../controllers/registerController';

const router = express.Router();

// 📸 Multer config (store files in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads')); // ✅ go one level up (since routes folder is inside src)
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

export default router;
