// import { Router } from 'express';
// import multer from 'multer';
// import path from 'path';
// import { getStories, submitStory } from '../controllers/storyController';

// const router = Router();

// // ✅ Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, '../../uploads'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // ✅ Routes
// router.get('/getstories', getStories);
// router.post('/submitstory', upload.single('image'), submitStory);

// export default router;
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { getStories, submitStory } from '../controllers/storyController';

const router = Router();

// ✅ Make sure uploads folder exists
const uploadPath = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log('✅ Upload folder created:', uploadPath);
}

// ✅ Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Routes
router.get('/getstories', getStories);
router.post('/submitstory', upload.single('image'), submitStory);

export default router;
