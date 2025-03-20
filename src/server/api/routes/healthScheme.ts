
import express from 'express';
import { query } from 'express-validator';
import { getAllHealthSchemes, getHealthSchemesByCategory, getHealthSchemeById } from '../services/healthSchemeService';

const router = express.Router();

// Get all health schemes
router.get('/', async (req, res) => {
  try {
    const healthSchemes = await getAllHealthSchemes();
    res.status(200).json({ success: true, data: healthSchemes });
  } catch (error) {
    console.error('Error fetching health schemes:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch health schemes' });
  }
});

// Get health schemes by category
router.get('/category', [
  query('category').isString()
], async (req, res) => {
  try {
    const category = req.query.category as string;
    const healthSchemes = await getHealthSchemesByCategory(category);
    res.status(200).json({ success: true, data: healthSchemes });
  } catch (error) {
    console.error('Error fetching health schemes by category:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch health schemes' });
  }
});

// Get health scheme by ID
router.get('/:id', async (req, res) => {
  try {
    const healthScheme = await getHealthSchemeById(req.params.id);
    if (!healthScheme) {
      return res.status(404).json({ success: false, message: 'Health scheme not found' });
    }
    res.status(200).json({ success: true, data: healthScheme });
  } catch (error) {
    console.error('Error fetching health scheme:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch health scheme' });
  }
});

export { router as healthSchemeRouter };
