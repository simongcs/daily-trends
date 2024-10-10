import { FeedModel } from './../models/feed.model';
import { Router } from 'express';
import FeedController from '../controllers/feed.controller';
import FeedService from '../services/feed.service';
import FeedRepository from '../repositories/feed.repository';

const router = Router();
const feedRepository = new FeedRepository(FeedModel);
const feedService = new FeedService(feedRepository);
const feedController = new FeedController(feedService);

router.get('/', feedController.getFeeds.bind(feedController));

router.get('/:id', feedController.getFeedById.bind(feedController));

router.post('/', feedController.createFeed.bind(feedController));

router.delete('/:id', feedController.deleteFeed.bind(feedController));

export default router;
