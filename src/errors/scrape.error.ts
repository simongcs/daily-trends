class ScrapingServiceError extends Error {
  constructor(message: string, detail?: string) {
    super(`${message}: ${detail}`);

    this.name = 'ScrapingServiceError';
  }
}

export class FetchHTMLError extends ScrapingServiceError {
  constructor(error: Error) {
    super(`FetchHTMLError: ${error.message}`);
  }
}

export class ParseHTMLError extends ScrapingServiceError {
  constructor(error: Error) {
    super(`ParseHTMLError: ${error.message}`);
  }
}

export class ScrapeError extends ScrapingServiceError {
  constructor(error: Error) {
    super(`ScrapeError: ${error.message}`);
  }
}
