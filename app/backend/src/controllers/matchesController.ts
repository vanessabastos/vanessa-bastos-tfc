import { Request, Response, NextFunction } from 'express';
import listMatch from '../services/matchesServices';

const listMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await listMatch();

    if (matches === null) return res.status(404).json({ message: 'Matches not found!' });

    return res.status(200).json(matches);
  } catch (e) {
    next(e);
  }
};

export default listMatches;
