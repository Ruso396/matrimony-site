import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { RegisterUser } from './registerUser';

// Define attributes interface
interface PremiumPaymentAttributes {
  id: number;
  userId: number;
  amount: number;
  duration: string;
  paymentMethod: string;
  transactionId: string;
  status: string;
  createdAt?: Date;
}

// Optional fields for creation
interface PremiumPaymentCreationAttributes extends Optional<PremiumPaymentAttributes, 'id' | 'status' | 'createdAt'> {}

// Define the Sequelize Model
export class PremiumPayment extends Model<PremiumPaymentAttributes, PremiumPaymentCreationAttributes>
  implements PremiumPaymentAttributes {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public duration!: string;
  public paymentMethod!: string;
  public transactionId!: string;
  public status!: string;
  public readonly createdAt!: Date;
}

// Initialize the model
PremiumPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'success',
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'PremiumPayment',
    tableName: 'premiumPayments',
    timestamps: false, // createdAt only (no updatedAt)
  }
);

// Associate with user table
RegisterUser.hasMany(PremiumPayment, { foreignKey: 'userId', as: 'payments' });
PremiumPayment.belongsTo(RegisterUser, { foreignKey: 'userId', as: 'user' });

export default PremiumPayment;
