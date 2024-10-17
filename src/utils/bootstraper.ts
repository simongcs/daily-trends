import { feedArraySchema } from './../validators/feed.validator';
import ScrapingService from '../services/scrapingFeed.service';
import FeedService from '../services/feed.service';
import logger from './logger';

class Bootstrapper {
  private scrapingService: ScrapingService;
  private feedService: FeedService;

  constructor(scrapingService: ScrapingService, feedService: FeedService) {
    this.scrapingService = scrapingService;
    this.feedService = feedService;
  }

  public async runOnStartup(): Promise<void> {
    try {
      logger.info('scraping...');
      const scrapedData = await this.scrapingService.scrape();
      logger.info('scrape data successfully');

      const { error } = feedArraySchema.validate(scrapedData);

      if (error) {
        throw new Error(error.message as string);
      }
      await this.feedService.bulkCreateFeeds(scrapedData);
    } catch (error) {
      logger.error('Error during startup process:', error);
    }
  }
}

export default Bootstrapper;
