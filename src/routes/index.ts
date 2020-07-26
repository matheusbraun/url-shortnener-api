import { Router } from 'express';
import UrlShortenerController from '../controllers/UrlShortenerController';

const routes = Router();

routes.post('/url-shortener', UrlShortenerController.create);
routes.get('/url-shortener/:shortUrlId', UrlShortenerController.show);

export default routes;
