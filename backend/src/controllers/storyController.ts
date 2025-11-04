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
    const { names, location, date, story, userId } = req.body;

    if (!names || !location || !story) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Validate story has minimum 164 characters
    const charCount = story.trim().length;
    if (charCount < 164) {
      return res.status(400).json({ 
        message: `Story must have at least 164 characters. You have ${charCount} character(s).` 
      });
    }

    // Ensure uploads folder exists
    const uploadDir = path.resolve(__dirname, '../uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    // Handle image upload properly
    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : '/uploads/default_couple.png';

    // Save story to DB
    const newStory = await SuccessStory.create({
      names,
      location,
      marriedDate: date || 'Recently',
      story,
      testimonial: story,
      image: imagePath,
      userId: parseInt(userId),
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

// PUT update story
export const updateStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { names, location, date, story, userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User ID is required' });
    }

    const existingStory = await SuccessStory.findByPk(id);
    
    if (!existingStory) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Verify user owns this story
    if (existingStory.userId !== parseInt(userId)) {
      return res.status(403).json({ message: 'You are not authorized to edit this story' });
    }

    // Validate story has minimum 164 characters
    if (story) {
      const charCount = story.trim().length;
      if (charCount < 164) {
        return res.status(400).json({ 
          message: `Story must have at least 164 characters. You have ${charCount} character(s).` 
        });
      }
    }

    // Handle image update
    let imagePath = existingStory.image;
    if (req.file) {
      // Delete old image if it's not the default
      if (existingStory.image && !existingStory.image.includes('default_couple.png')) {
        const oldImagePath = path.resolve(__dirname, '..', existingStory.image.substring(1));
        try {
          await fs.unlink(oldImagePath);
        } catch (err) {
          console.log('Could not delete old image:', err);
        }
      }
      imagePath = `/uploads/${req.file.filename}`;
    }

    // Update story
    await existingStory.update({
      names: names || existingStory.names,
      location: location || existingStory.location,
      marriedDate: date || existingStory.marriedDate,
      story: story || existingStory.story,
      testimonial: story || existingStory.testimonial,
      image: imagePath,
    });

    res.status(200).json({
      message: 'Story updated successfully!',
      story: existingStory,
    });
  } catch (error) {
    console.error('Error updating story:', error);
    res.status(500).json({
      message: 'Failed to update story',
      error: (error as Error).message,
    });
  }
};

// DELETE story
export const deleteStory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'User ID is required' });
    }

    const story = await SuccessStory.findByPk(id);
    
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Verify user owns this story
    if (story.userId !== parseInt(userId)) {
      return res.status(403).json({ message: 'You are not authorized to delete this story' });
    }

    // Delete image file if it's not the default
    if (story.image && !story.image.includes('default_couple.png')) {
      const imagePath = path.resolve(__dirname, '..', story.image.substring(1));
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('Could not delete image file:', err);
      }
    }

    // Delete story from DB
    await story.destroy();

    res.status(200).json({
      message: 'Story deleted successfully!',
    });
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({
      message: 'Failed to delete story',
      error: (error as Error).message,
    });
  }
};
