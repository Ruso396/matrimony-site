import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Existing routes


// Your new registration routes
import registerRoutes from './routes/registerRoutes';
import premiumRoutes from './routes/PremiumPaymentRoutes';

import { connectDB, sequelize } from './config/db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded profile photos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

app.use('/api/register', registerRoutes); // <- registration endpoints
app.use('/api/premiumpayment', premiumRoutes);

// Health Check
app.get('/', (req, res) => res.send('Soulmate API is running!'));

// Sync DB and start server
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced!');
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
