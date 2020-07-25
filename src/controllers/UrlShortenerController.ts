import { Request, Response } from 'express';

import UrlShortener from '../models/UrlShortener';

const UrlShortenerController = {
  async show(request: Request, response: Response): Promise<Response> {
    const { urlid } = request.query;

    const url = await UrlShortener.findOne({
      shortUrlId: urlid,
    });

    return response.json({ message: url });
  },
};

export default UrlShortenerController;
