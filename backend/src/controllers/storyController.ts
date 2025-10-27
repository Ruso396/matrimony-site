import { Request, Response } from 'express';
import { SuccessStory } from '../models/Story';
import fs from 'fs/promises';
import path from 'path';

// GET all stories
export const getStories = async (req: Request, res: Response) => {
  try {
    const stories = await SuccessStory.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ message: 'Failed to fetch stories' });
  }
};

// POST new story
export const submitStory = async (req: Request, res: Response) => {
  try {
    const { names, location, date, story } = req.body;

    if (!names || !location || !story) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Ensure uploads folder exists
    const uploadDir = path.resolve(__dirname, '../uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // ✅ Handle image upload properly
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : '/uploads/default_couple.png';

    // ✅ Save story to DB
    const newStory = await SuccessStory.create({
      names,
      location,
      marriedDate: date || 'Recently',
      story,
      testimonial: story,
      image: imagePath,
      isFeatured: false,
      color: req.body.color || 'from-rose-500 to-pink-600',
    });

    res.status(201).json({
      message: 'Story submitted successfully!',
      story: newStory,
    });
  } catch (error) {
    console.error('Error submitting story:', error);
    res.status(500).json({
      message: 'Failed to submit story',
      error: (error as Error).message,
    });
  }
};
