import { FeedModel } from './../models/feed.model';
import { Router } from 'express';
import FeedController from '../controllers/feed.controller';
import FeedService from '../services/feed.service';
import FeedRepository from '../repositories/feed.repository';
import validationMiddleware from '../middlewares/validation.middleware';
import { feedSchemaValidator } from '../validators/feed.validator';

const router = Router();
const feedRepository = new FeedRepository(FeedModel);
const feedService = new FeedService(feedRepository);
const feedController = new FeedController(feedService);

router.get('/', feedController.getFeeds.bind(feedController));

router.get('/:id', feedController.getFeedById.bind(feedController));

router.post(
  '/',
  validationMiddleware(feedSchemaValidator),
  feedController.createFeed.bind(feedController),
);

router.delete('/:id', feedController.deleteFeed.bind(feedController));

export default router;
