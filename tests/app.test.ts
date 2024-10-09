import request from 'supertest';
import app from '../src/app';
import Database from '../src/config/db';

jest.mock('../src/utils/logger.ts', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

jest.mock('../src/config/db.ts');

describe('app tests', () => {
  let db: Database;
  beforeEach(() => {
    db = new Database();
  });
  describe('GET /health', () => {
    it('should return 200', async () => {
      db.connect = jest.fn().mockReturnValue(true);
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
    });
  });
});
