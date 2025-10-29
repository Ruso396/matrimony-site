import express from "express";
import cors from "cors";
import adminRoutes from './routes/adminRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Admin routes
app.use('/api/admin', adminRoutes);

export default app;
