import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Routes
import registerRoutes from './routes/registerRoutes';
import premiumRoutes from './routes/PremiumPaymentRoutes';

import { connectDB, sequelize } from './config/db';
import storyRoutes from './routes/storyRoute';

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

app.use('/api/register', registerRoutes); // <- registration endpoints
app.use('/api/premiumpayment', premiumRoutes);
// ✅ API routes
app.use('/api/register', registerRoutes);
app.use('/api/stories', storyRoutes);

// ✅ Health check route
app.get('/', (req, res) => res.send('Soulmate API is running!'));

// ✅ Start server after syncing database
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced!');
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
