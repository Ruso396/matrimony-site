import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

interface InterestRequestAttributes {
  id?: number;
  senderId: number;
  receiverId: number;
  status: "pending" | "accepted" | "rejected";
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
