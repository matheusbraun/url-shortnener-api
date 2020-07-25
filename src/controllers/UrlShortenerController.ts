import { Request, Response, NextFunction } from 'express';

import UrlShortener from '../models/UrlShortener';

const UrlShortenerController = {
  async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const { urlid } = request.query;

      const url = await UrlShortener.findOne({
        shortUrlId: urlid,
      });

      return response.json({ message: url });
    } catch (err) {
      return next(err);
    }
  },
};

export default UrlShortenerController;
