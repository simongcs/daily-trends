import ScrapingService from '../../src/services/scrapingFeed.service';
import * as iconv from 'iconv-lite';
import { FetchHTMLError, ScrapeError } from '../../src/errors/scrape.error';

jest.mock('iconv-lite');
jest.mock('cheerio');
global.fetch = jest.fn();

describe('ScrapingService', () => {
  let scrapingService: ScrapingService;
  const mockUrls = ['http://example.com'];

  beforeEach(() => {
    scrapingService = new ScrapingService(mockUrls);
  });

  describe('fetchHTML', () => {
    it('should fetch and decode HTML content from URLs', async () => {
      const mockResponse = {
        arrayBuffer: jest.fn().mockResolvedValue(Buffer.from('mock data')),
        headers: {
          get: jest.fn().mockReturnValue('text/html; charset=utf-8'),
        },
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
      (iconv.decode as jest.Mock).mockReturnValue('decoded HTML');

      const result = await scrapingService['fetchHTML']();

      expect(result).toEqual(['decoded HTML']);
      expect(global.fetch).toHaveBeenCalledWith(mockUrls[0]);
      expect(iconv.decode).toHaveBeenCalledWith(
        Buffer.from('mock data'),
        'utf-8',
      );
    });

    it('should throw FetchHTMLError if fetch fails', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('fetch error'));

      await expect(scrapingService['fetchHTML']()).rejects.toThrow(
        FetchHTMLError,
      );
    });
  });

  describe('scrape', () => {
    it('should fetch and parse articles', async () => {
      const mockHtml = ['decoded HTML'];
      const mockArticles = [
        { title: 'Title', link: 'http://example.com', source: mockUrls[0] },
      ];

      jest
        .spyOn(scrapingService as any, 'fetchHTML')
        .mockResolvedValue(mockHtml);
      jest
        .spyOn(scrapingService as any, 'parseHTML')
        .mockReturnValue(mockArticles);

      const result = await scrapingService.scrape();

      expect(result).toEqual(mockArticles);
    });

    it('should throw ScrapeError if scraping fails', async () => {
      jest
        .spyOn(scrapingService, 'fetchHTML' as keyof ScrapingService)
        .mockRejectedValue(new Error('scraping error'));

      await expect(scrapingService.scrape()).rejects.toThrow(ScrapeError);
    });
  });
});
