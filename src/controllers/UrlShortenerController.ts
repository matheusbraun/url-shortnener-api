import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';

import UrlShortener, { IUrlShortener } from '../models/UrlShortener';

const UrlShortenerController = {
  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response<IUrlShortener>> {
    try {
      const { fullUrl, shortUrl } = request.body;

      const shortUrlToSave = shortUrl
        ? shortUrl.toLowerCase()
        : shortid.generate;

      let url = await UrlShortener.findOne({
        fullUrl,
      });

      if (url === null || url.shortUrl !== shortUrlToSave) {
        url = await UrlShortener.create({
          fullUrl,
          shortUrl: shortUrlToSave,
        });
      }

      return response.json(url);
    } catch (err) {
      return next(err);
    }
  },

  async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { shortUrlId } = request.params;

      const url = await UrlShortener.findOne({
        shortUrl: shortUrlId,
      });

      if (url === null) {
        response.status(404);
        throw new Error('Short url not found.');
      }

      return response.redirect(url.fullUrl);
    } catch (err) {
      return next(err);
    }
  },
};

export default UrlShortenerController;
