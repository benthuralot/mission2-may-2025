// apiRoutes.js
import express from 'express';
import { calculateCarValue } from './api-01.js';

const router = express.Router();

// GET /api root route to respond with a simple message
router.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// POST /api/calculate route to calculate car value
router.post('/calculate', (req, res) => {
  const result = calculateCarValue(req.body.car);
  res.json({ result });
});

export default router;
