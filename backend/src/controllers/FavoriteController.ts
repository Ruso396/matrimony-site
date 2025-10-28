import { Request, Response } from "express";
import { Favorite } from "../models/FavoriteModel"; // ✅ make sure model path is correct

// Add favorite
export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, favoriteUserId } = req.body;

    if (!userId || !favoriteUserId) {
      return res.status(400).json({ message: "Missing userId or favoriteUserId" });
    }

    // Prevent duplicates
    const existing = await Favorite.findOne({ where: { userId, favoriteUserId } });
    if (existing) {
      return res.status(200).json({ message: "Already in favorites" });
    }

    await Favorite.create({ userId, favoriteUserId });
    return res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Remove favorite
export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, favoriteUserId } = req.body;

    if (!userId || !favoriteUserId) {
      return res.status(400).json({ message: "Missing userId or favoriteUserId" });
    }

    const removed = await Favorite.destroy({
      where: { userId, favoriteUserId },
    });

    if (!removed) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    return res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get favorites
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.findAll({ where: { userId } });
    return res.status(200).json({ favorites });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
