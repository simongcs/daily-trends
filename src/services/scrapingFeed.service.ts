import { ParseHTMLError, ScrapeError } from './../errors/scrape.error';
import * as cheerio from 'cheerio';
import { IFeed } from '../models/feed.model';
import { FetchHTMLError } from '../errors/scrape.error';
import logger from '../utils/logger';
import * as iconv from 'iconv-lite';

class ScrapingService {
  private sourceUrls: string | string[];

  constructor(sourceUrls: string | string[]) {
    this.sourceUrls = sourceUrls;
  }

  private async fetchHTML(): Promise<string[]> {
    try {
      const urlArray = Array.isArray(this.sourceUrls)
        ? this.sourceUrls
        : [this.sourceUrls];

      const responses = await Promise.all(
        urlArray.map(async url => {
          const response = await fetch(url);
          const buffer = await response.arrayBuffer();
          const contentType = response.headers.get('content-type') || '';

          const encoding = contentType.includes('charset=')
            ? contentType.split('charset=')[1]
            : 'utf-8';
          return iconv.decode(Buffer.from(buffer), encoding);
        }),
      );
      return responses;
    } catch (error) {
      throw new FetchHTMLError(error as Error);
    }
  }

  private parseHTML(htmls: string[]): IFeed[] {
    const articles: IFeed[] = [];
    htmls.forEach((html, index) => {
      const source = Array.isArray(this.sourceUrls)
        ? this.sourceUrls[index]
        : this.sourceUrls;
      try {
        const $ = cheerio.load(html);
        const htmlElements = $('article').slice(0, 5);
        htmlElements.each((i, element) => {
          const title = $(element).find('h2').text();
          const link = $(element).find('a').attr('href');

          articles.push({ title, link, source } as IFeed);
        });
      } catch (error) {
        throw new ParseHTMLError(error as Error);
      }
    });

    return articles;
  }

  public async scrape(): Promise<IFeed[]> {
    try {
      const htmls = await this.fetchHTML();
      const articles = this.parseHTML(htmls);
      return articles;
    } catch (error) {
      logger.error(error);
      throw new ScrapeError(error as Error);
    }
  }
}

export default ScrapingService;
