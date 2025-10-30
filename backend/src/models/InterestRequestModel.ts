import { DataTypes, Model, Optional, Association } from "sequelize";
import { sequelize } from "../config/db";
import { RegisterUser } from "./registerUser";

interface InterestRequestAttributes {
  id?: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
  createdAt?: Date;
  updatedAt?: Date;
}

interface InterestRequestCreationAttributes
  extends Optional<InterestRequestAttributes, "id"> {}

export class InterestRequest
  extends Model<InterestRequestAttributes, InterestRequestCreationAttributes>
  implements InterestRequestAttributes
{
  public id!: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: "pending" | "accepted" | "rejected";

  // ✅ add timestamp properties
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ✅ add associated models (for include)
  public readonly sender?: RegisterUser;
  public readonly receiver?: RegisterUser;

  // Optional static association type for better IntelliSense
  public static associations: {
    sender: Association<InterestRequest, RegisterUser>;
    receiver: Association<InterestRequest, RegisterUser>;
  };
}

InterestRequest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "interest_requests",
    timestamps: true,
  }
);

// ✅ Define associations
InterestRequest.belongsTo(RegisterUser, {
  as: "sender",
  foreignKey: "senderId",
});

InterestRequest.belongsTo(RegisterUser, {
  as: "receiver",
  foreignKey: "receiverId",
});
