import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Routes
import registerRoutes from './routes/registerRoutes';
import premiumRoutes from './routes/PremiumPaymentRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import adminRoutes from './routes/adminRoutes';
import { connectDB, sequelize } from './config/db';
import storyRoutes from './routes/storyRoute';
import requestRoutes from "./routes/requestRoutes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Ensure uploads folder exists before serving
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('✅ uploads folder created!');
}

// ✅ Serve uploaded images
app.use('/uploads', express.static(uploadDir));

app.use('/api/register', registerRoutes); 
app.use('/api/premiumpayment', premiumRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/admin', adminRoutes);

// ✅ Health check route
app.get('/', (req, res) => res.send('Soulmate API is running!'));

// ✅ Start server after DB connection and syncing
const PORT = process.env.PORT || 5000;

// 👇 Add this line to log successful DB connection
connectDB();  // ✅ This triggers your console log from db.ts

sequelize.sync().then(() => {
  console.log('Database synced!');
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
