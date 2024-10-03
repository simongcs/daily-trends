class FeedRepositoryError extends Error {
  constructor(message: string, detail?: string) {
    super(`${message}: ${detail}`);

    this.name = 'FeedRepositoryError';
  }
}

export class FeedCreationError extends FeedRepositoryError {
  constructor(error: unknown) {
    const message = 'FEED_CREATION_ERROR';
    if (error instanceof Error) {
      super(message, error.message);
    } else {
      super(message, error as string);
    }
  }
}

export class FeedNotFoundError extends FeedRepositoryError {
  constructor(error: unknown) {
    const message = 'FEED_NOT_FOUND_ERROR';
    if (error instanceof Error) {
      super(message, error.message);
    } else {
      super(message, error as string);
    }
  }
}

export class FeedDeletionError extends FeedRepositoryError {
  constructor(error: unknown) {
    const message = 'FEED_DELETION_ERROR';
    if (error instanceof Error) {
      super(message, error.message);
    } else {
      super(message, error as string);
    }
  }
}

export class FeedRetrievalError extends FeedRepositoryError {
  constructor(error: unknown) {
    const message = 'FEED_RETRIEVAL_ERROR';
    if (error instanceof Error) {
      super(message, error.message);
    } else {
      super(message, error as string);
    }
  }
}
