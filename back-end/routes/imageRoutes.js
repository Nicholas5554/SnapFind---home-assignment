import { Router } from 'express';
import { getImagesByCategory } from '../controllers/imageController.js';

const router = Router();

// Route for fetching images by category
router.get('/:category', getImagesByCategory);

export default router;