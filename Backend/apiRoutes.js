// apiRoutes.js
import express from 'express';
import { calculateCarValue } from './api-01.js';
import { premiumCalculator } from './premiumCalculator.js';
import { calculateRiskRating } from './caculateRiskRating.js';

const route = express.Router();

// GET /api root route to respond with a simple message
route.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

// POST /api/calculate route to calculate car value
route.post('/calculate', (req, res) => {
  const result = calculateCarValue(req.body.car);
  res.json({ result });
});

//Tu's API risk rating calculator
route.post("/api/rating", (req, res) => {
   try {
    const input = request.body;
    const result = calculateRiskRating(input);

    if (result.error) {
      return response.status(400).json(result);
    }

    response.status(200).json(result);
  } catch(error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


// Erek's API: calculates premium
route.post('/premium-calculator', (request, response) => {
  try {
    const input = request.body;
    const result = premiumCalculator(input);

    if (result.error) {
      return response.status(400).json(result);
    }

    response.status(200).json(result);
  } catch(error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


export default route;
