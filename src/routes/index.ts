import { Router } from 'express';
import UrlShortenerController from '../controllers/UrlShortenerController';

const routes = Router();

routes.get('/url-shortener/:urlid', UrlShortenerController.show);

export default routes;
