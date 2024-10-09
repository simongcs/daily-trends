import {
  FeedCreationError,
  FeedDeletionError,
  FeedRetrievalError,
} from './../../src/errors/feed.repository.error';
import FeedRepository from '../../src/repositories/feed.repository';
import { FeedModel, IFeed } from '../../src/models/feed.model';

const mockFeed = {
  title: 'mock feed',
  link: 'http://test.com',
  source: 'test source',
  date: new Date(),
  _id: 'id1',
};

const mockFeeds = [mockFeed, { ...mockFeed, title: 'mock feed2' }];

jest.mock('../../src/models/feed.model.ts', () => ({
  FeedModel: jest.fn(() => ({
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
  })),
}));

describe('Feed repository tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const feedRepository = new FeedRepository(FeedModel);

  describe('create feed', () => {
    it('Should create a feed', async () => {
      FeedModel.create = jest.fn().mockResolvedValue(mockFeed);

      const feed = await feedRepository.createFeed(mockFeed);

      expect(FeedModel.create).toHaveBeenCalledTimes(1);
      expect(feed).toMatchObject(mockFeed);
    });
    it('Should throw an error if feed creation fails', async () => {
      FeedModel.create = jest.fn().mockRejectedValue(new Error('test'));

      await expect(() =>
        feedRepository.createFeed({} as Partial<IFeed>),
      ).rejects.toThrow(new FeedCreationError('test'));
    });
  });

  describe('get feeds', () => {
    it('should get feeds', async () => {
      const mockFind = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockFeed]),
      });
      FeedModel.find = mockFind;

      const feeds = await feedRepository.getFeeds();

      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(feeds).toHaveLength(1);
      expect(feeds).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: mockFeed.title,
            link: mockFeed.link,
            source: mockFeed.source,
            date: mockFeed.date,
          }),
        ]),
      );
    });

    it('should throw an error of type FeedRetrievalError', async () => {
      const mockFind = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('test')),
      });
      FeedModel.find = mockFind;

      await expect(feedRepository.getFeeds()).rejects.toThrow(
        new FeedRetrievalError('test'),
      );
    });
  });

  describe('get feed by id', () => {
    it('should get feed by id', async () => {
      const mockFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockFeed),
      });
      FeedModel.findById = mockFindById;

      const feed = await feedRepository.getFeedById(mockFeed._id);

      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(feed).toMatchObject(mockFeed);
    });

    it('should throw an error of type FeedRetrievalError', async () => {
      const mockFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('test')),
      });
      FeedModel.findById = mockFindById;

      await expect(feedRepository.getFeedById('')).rejects.toThrow(
        new FeedRetrievalError('test'),
      );
    });
  });

  describe('delete feed', () => {
    it('should delete feed', async () => {
      const mockFindByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({
          deletedCount: 1,
        }),
      });
      FeedModel.findByIdAndDelete = mockFindByIdAndDelete;

      const feed = await feedRepository.deleteFeed(mockFeed._id);

      expect(mockFindByIdAndDelete).toHaveBeenCalledTimes(1);
      expect(feed).toEqual({
        deletedCount: 1,
      });
    });

    it('should throw an error of type FeedDeletionError', async () => {
      const mockFindByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('test')),
      });
      FeedModel.findByIdAndDelete = mockFindByIdAndDelete;

      await expect(feedRepository.deleteFeed('')).rejects.toThrow(
        new FeedDeletionError('test'),
      );
    });
  });

  describe('bulkCreateFeeds', () => {
    it('should create multiple feeds', async () => {
      FeedModel.insertMany = jest.fn().mockResolvedValue(mockFeeds);

      const result = await feedRepository.bulkCreateFeeds(mockFeeds as IFeed[]);

      expect(result).toEqual(mockFeeds);
      expect(FeedModel.insertMany).toHaveBeenCalledTimes(1);
      expect(FeedModel.insertMany).toHaveBeenCalledWith(mockFeeds);
    });

    it('should throw an error if feed creation fails', async () => {
      FeedModel.insertMany = jest
        .fn()
        .mockRejectedValue(new Error('Test error'));

      await expect(
        feedRepository.bulkCreateFeeds(mockFeeds as IFeed[]),
      ).rejects.toThrow(new FeedCreationError('Test error'));
    });
  });
});
