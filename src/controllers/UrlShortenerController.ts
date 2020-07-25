import { Request, Response, NextFunction } from 'express';

import UrlShortener from '../models/UrlShortener';

const UrlShortenerController = {
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
