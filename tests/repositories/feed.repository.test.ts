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

jest.mock('../../src/models/feed.model.ts');

describe('Feed repository tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('create feed', () => {
    it('Should create a feed', async () => {
      const mockSave = jest.fn().mockResolvedValue(mockFeed);
      (FeedModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));
      const feed = await FeedRepository.createFeed(mockFeed);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(feed).toMatchObject(mockFeed);
    });
    it('Should throw an error if feed creation fails', async () => {
      //   const err = new FeedCreationError('test');
      const mockSave = jest.fn().mockRejectedValue(new Error('test'));
      (FeedModel as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      const feedData: Partial<IFeed> = { title: 'Test Feed' };
      await expect(() => FeedRepository.createFeed(feedData)).rejects.toThrow(
        new FeedCreationError('test'),
      );
    });
  });

  describe('get feeds', () => {
    it('should get feeds', async () => {
      const mockFind = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue([mockFeed]),
      });
      FeedModel.find = mockFind;

      const feeds = await FeedRepository.getFeeds();

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

      await expect(FeedRepository.getFeeds()).rejects.toThrow(
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

      const feed = await FeedRepository.getFeedById(mockFeed._id);

      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(feed).toMatchObject(mockFeed);
    });

    it('should throw an error of type FeedRetrievalError', async () => {
      const mockFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('test')),
      });
      FeedModel.findById = mockFindById;

      await expect(FeedRepository.getFeedById('')).rejects.toThrow(
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

      const feed = await FeedRepository.deleteFeed(mockFeed._id);

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

      await expect(FeedRepository.deleteFeed('')).rejects.toThrow(
        new FeedDeletionError('test'),
      );
    });
  });
});
