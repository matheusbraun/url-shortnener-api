import { Request, Response, NextFunction } from 'express';
import shortid from 'shortid';
import validator from 'validator';

import UrlShortener, { IUrlShortener } from '../models/UrlShortener';

const UrlShortenerController = {
  async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response<IUrlShortener>> {
    try {
      const { fullUrl, shortUrl } = request.body;

      if (!validator.isURL(fullUrl)) {
        response.status(422);
        throw new Error('The URL informed is not correct.');
      }

      const shortUrlToSave: string = shortUrl
        ? shortUrl.toLowerCase()
        : shortid.generate();

      if (shortUrlToSave.length > 14 || !shortid.isValid(shortUrlToSave)) {
        response.status(422);
        throw new Error('The short URL informed has a wrong format.');
      }

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
