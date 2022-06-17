import * as express from 'express';
import leaderboardsController from '../controllers/leaderboardController';

const leaderboardsRouter = express.Router();

leaderboardsRouter.get('/home', leaderboardsController);

export default leaderboardsRouter;
