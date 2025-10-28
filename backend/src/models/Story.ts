// src/models/SuccessStory.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

// 1. Define the attributes for the Story interface
interface StoryAttributes {
    id: number;
    names: string;
    location: string;
    marriedDate: string;
    story: string;
    testimonial: string; // The story will be used for both story and testimonial
    image: string; // This will store the path to the uploaded image
    isFeatured: boolean;
    color: string;
}

// 2. Define the attributes that are optional for model creation
interface StoryCreationAttributes extends Optional<StoryAttributes, 'id' | 'testimonial' | 'isFeatured' | 'color'> {}

// 3. Extend Model with the correct interface
export class SuccessStory extends Model<StoryAttributes, StoryCreationAttributes> implements StoryAttributes {
    public id!: number;
    public names!: string;
    public location!: string;
    public marriedDate!: string;
    public story!: string;
    public testimonial!: string;
    public image!: string;
    public isFeatured!: boolean;
    public color!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// 4. Initialize the Model
SuccessStory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        names: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        marriedDate: {
            type: DataTypes.STRING(64),
            allowNull: true,
        },
        story: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        testimonial: {
            type: DataTypes.TEXT, // Using the same field for simplicity
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, // Path to the uploaded image file
            allowNull: false,
        },
        isFeatured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        color: {
            type: DataTypes.STRING(64),
            defaultValue: 'from-rose-500 to-pink-600',
        },
    },
    {
        tableName: 'success_stories',
        sequelize, // passing the `sequelize` instance is required
        timestamps: true,
    }
);

// Optional: Add a simple check for image upload
// SuccessStory.beforeCreate(async (story) => {
//     if (!story.image) {
//         throw new Error('Image is required');
//     }
// });

export default SuccessStory;