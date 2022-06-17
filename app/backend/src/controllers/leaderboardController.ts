import { Request, Response, NextFunction } from 'express';
import getHomeLeaderBoard from '../services/leaderboardsServices';

const getLeaderBoarderHomeController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderBoard = await getHomeLeaderBoard();

    return res.status(200).json(leaderBoard);
  } catch (e) {
    next(e);
  }
};

export default getLeaderBoarderHomeController;
