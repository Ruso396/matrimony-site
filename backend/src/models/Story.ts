import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { RegisterUser } from '../models/registerUser';

interface StoryAttributes {
  id: number;
  names: string;
  location: string;
  marriedDate: string;
  story: string;
  testimonial: string;
  image: string;
  userId: number | null;
  isFeatured: boolean;
  color: string;
}

interface StoryCreationAttributes extends Optional<StoryAttributes, 'id'> {}

export class SuccessStory extends Model<StoryAttributes, StoryCreationAttributes>
  implements StoryAttributes {
  public id!: number;
  public names!: string;
  public location!: string;
  public marriedDate!: string;
  public story!: string;
  public testimonial!: string;
  public image!: string;
  public userId!: number | null;
  public isFeatured!: boolean;
  public color!: string;
}

SuccessStory.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    names: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marriedDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    testimonial: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'SuccessStory',
    tableName: 'success_stories',
  }
);

// Define relationship
SuccessStory.belongsTo(RegisterUser, { foreignKey: 'userId', as: 'user' });
RegisterUser.hasMany(SuccessStory, { foreignKey: 'userId', as: 'stories' });
