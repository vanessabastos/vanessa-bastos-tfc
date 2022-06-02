import { Request, Response, NextFunction } from 'express';
import listMatch from '../services/matchesServices';

const listMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await listMatch();

    return res.status(200).json(matches);
  } catch (e) {
    next(e);
  }
};

export default listMatches;
