
import express from 'express';
import { query, param } from 'express-validator';
import { getAshaWorkersByLocation, getAshaWorkerById, getAllAshaWorkers } from '../services/ashaWorkerService';

const router = express.Router();

// Get ASHA workers by district and state
router.get('/location', [
  query('district').optional().isString(),
  query('state').optional().isString()
], async (req, res) => {
  try {
    const district = req.query.district as string;
    const state = req.query.state as string;
    
    const ashaWorkers = await getAshaWorkersByLocation(district, state);
    res.status(200).json({ success: true, data: ashaWorkers });
  } catch (error) {
    console.error('Error fetching ASHA workers by location:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ASHA workers' });
  }
});

// Get all ASHA workers
router.get('/', async (req, res) => {
  try {
    const ashaWorkers = await getAllAshaWorkers();
    res.status(200).json({ success: true, data: ashaWorkers });
  } catch (error) {
    console.error('Error fetching all ASHA workers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ASHA workers' });
  }
});

// Get ASHA worker by ID
router.get('/:id', [
  param('id').isString()
], async (req, res) => {
  try {
    const ashaWorker = await getAshaWorkerById(req.params.id);
    if (!ashaWorker) {
      return res.status(404).json({ success: false, message: 'ASHA worker not found' });
    }
    res.status(200).json({ success: true, data: ashaWorker });
  } catch (error) {
    console.error('Error fetching ASHA worker:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch ASHA worker' });
  }
});

export { router as ashaWorkerRouter };
