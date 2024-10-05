import FeedService from '../../src/services/feed.service';
import FeedRepository from '../../src/repositories/feed.repository';
import { FeedModel, IFeed } from '../../src/models/feed.model';

// Mock the FeedRepository
jest.mock('../../src/repositories/feed.repository');

describe('FeedService', () => {
  let feedService: FeedService;
  let feedRepository: jest.Mocked<FeedRepository>;

  beforeEach(() => {
    feedRepository = new FeedRepository(
      FeedModel,
    ) as jest.Mocked<FeedRepository>;
    feedService = new FeedService(feedRepository);
  });

  describe('getFeeds', () => {
    it('should return a list of feeds', async () => {
      const feeds: Partial<IFeed>[] = [
        {
          _id: '1',
          title: 'Feed 1',
          link: 'link1',
          source: 'source1',
          date: new Date(),
        },
        {
          _id: '2',
          title: 'Feed 2',
          link: 'link2',
          source: 'source2',
          date: new Date(),
        },
      ];

      feedRepository.getFeeds.mockResolvedValue(feeds as IFeed[]);

      const result = await feedService.getFeeds();

      expect(result).toEqual(feeds);
      expect(feedRepository.getFeeds).toHaveBeenCalledTimes(1);
    });
  });

  describe('createFeed', () => {
    it('should create and return the created feed', async () => {
      const feedData: Partial<IFeed> = {
        _id: '1',
        title: 'New Feed',
        link: 'link',
        source: 'source',
        date: new Date(),
      };

      feedRepository.createFeed.mockResolvedValue(feedData as IFeed);

      const result = await feedService.createFeed(feedData as IFeed);

      expect(result).toEqual(feedData);
      expect(feedRepository.createFeed).toHaveBeenCalledWith(feedData);
      expect(feedRepository.createFeed).toHaveBeenCalledTimes(1);
    });
  });

  describe('getFeedById', () => {
    it('should return a feed by id', async () => {
      const feed: Partial<IFeed> = {
        _id: '1',
        title: 'Feed 1',
        link: 'link1',
        source: 'source1',
        date: new Date(),
      };

      feedRepository.getFeedById.mockResolvedValue(feed as IFeed);

      const result = await feedService.getFeedById('1');

      expect(result).toEqual(feed);
      expect(feedRepository.getFeedById).toHaveBeenCalledWith('1');
      expect(feedRepository.getFeedById).toHaveBeenCalledTimes(1);
    });

    it('should return null if feed is not found', async () => {
      feedRepository.getFeedById.mockResolvedValue(null);

      const result = await feedService.getFeedById('invalid-id');

      expect(result).toBeNull();
      expect(feedRepository.getFeedById).toHaveBeenCalledWith('invalid-id');
      expect(feedRepository.getFeedById).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteFeed', () => {
    it('should delete a feed and return the deleted feed', async () => {
      const feed: Partial<IFeed> = {
        _id: '1',
        title: 'Feed 1',
        link: 'link1',
        source: 'source1',
        date: new Date(),
      };

      feedRepository.deleteFeed.mockResolvedValue(feed as IFeed);

      const result = await feedService.deleteFeed('1');

      expect(result).toEqual(feed);
      expect(feedRepository.deleteFeed).toHaveBeenCalledWith('1');
      expect(feedRepository.deleteFeed).toHaveBeenCalledTimes(1);
    });

    it('should return null if feed to delete is not found', async () => {
      feedRepository.deleteFeed.mockResolvedValue(null);

      const result = await feedService.deleteFeed('invalid-id');

      expect(result).toBeNull();
      expect(feedRepository.deleteFeed).toHaveBeenCalledWith('invalid-id');
      expect(feedRepository.deleteFeed).toHaveBeenCalledTimes(1);
    });
  });
});
