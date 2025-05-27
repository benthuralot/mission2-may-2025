// apiRoutes.test.js
import request from 'supertest';
import express from 'express';
import apiRoutes from './apiRoutes.js';

// We will mock calculateCarValue to isolate the route test
import * as api01 from './api-01.js';

describe('API Routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api', apiRoutes);
  });

  describe('GET /api', () => {
    it('responds with 200 and a JSON message', async () => {
      const res = await request(app).get('/api');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'API is working' });
    });
  });

  describe('POST /api/calculate', () => {
    it('calls calculateCarValue and returns the result', async () => {
      // Arrange: mock calculateCarValue
      const mockResult = 12345;
      jest.spyOn(api01, 'calculateCarValue').mockReturnValue(mockResult);

      // Act: send a sample car object
      const carData = { model: 'Civic', year: 2020 };
      const res = await request(app)
        .post('/api/calculate')
        .send({ car: carData });

      // Assert
      expect(api01.calculateCarValue).toHaveBeenCalledWith(carData);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ result: mockResult });

      // Cleanup mock
      api01.calculateCarValue.mockRestore();
    });
  });
});
