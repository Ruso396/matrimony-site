// src/routes/favoriteRoutes.ts
import express from 'express';
import { addFavorite, getFavorites, removeFavorite } from '../controllers/FavoriteController';

const router = express.Router();

router.post('/add', addFavorite);
router.get('/:userId', getFavorites);
router.post('/remove', removeFavorite);

export default router;
