import { FeedModel } from './models/feed.model';
import app from './app';
import config from './config/config';
import FeedRepository from './repositories/feed.repository';
import FeedService from './services/feed.service';
import ScrapingService from './services/scrapingFeed.service';
import logger from './utils/logger';
import feedUrls from './config/feeds';
import Bootstrapper from './utils/bootstraper';
import Database from './config/db';

const feedRepository = new FeedRepository(FeedModel);
const scrapingService = new ScrapingService(feedUrls.map(feed => feed.url));
const feedService = new FeedService(feedRepository);
const bootstrapper = new Bootstrapper(scrapingService, feedService);

const startServer = async () => {
  try {
    await bootstrapper.runOnStartup();

    await Database.connect(config.DB_CONNECTION_STRING as string, 'main');

    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    logger.error('Error during startup process:', error);
    process.exit(1); // Exit the process if startup fails
  }
};

process.on('SIGINT', async () => {
  await Database.disconnectAll();
  process.exit(0);
});

startServer();
