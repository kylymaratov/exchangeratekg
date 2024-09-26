import { Router } from 'express';
import valutaKgApi from './valutakg-api';

const apiRouter = Router();

apiRouter.use('/valutakg/', valutaKgApi);

export default apiRouter;
