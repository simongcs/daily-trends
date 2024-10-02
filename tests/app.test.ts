import request from 'supertest';
import app from '../src/app';

jest.mock('../src/core/logger.ts', () => ({
  info: jest.fn(),
}));

describe('app tests', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
    });
  });
});
