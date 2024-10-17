import request from 'supertest';
import app from '../src/app';

jest.mock('../src/utils/logger.ts', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../src/config/db.ts');

describe('app tests', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
    });
  });
});
