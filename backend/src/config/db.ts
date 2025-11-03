import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'soulmate_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,

    // ✅ Connection pool configuration
    pool: {
      max: 10,       // Maximum number of connections in pool
      min: 0,        // Minimum number of connections in pool
      acquire: 30000, // The maximum time (ms) that pool will try to get connection before throwing error
      idle: 10000,   // The maximum time (ms) that a connection can be idle before being released
    },

    dialectOptions: {
      connectTimeout: 60000, // Optional: Wait longer for connection if DB is slow
    },
  }
);

// ✅ Test connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully (with pooling)!');
  } catch (error) {
    console.error('❌ Unable to connect to DB:', error);
  }
};
