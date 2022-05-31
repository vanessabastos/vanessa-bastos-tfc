import { Request, Response, NextFunction } from 'express';
import { getAllTeams, getByIdTeams } from '../services/teamsService';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const team = await getAllTeams();

    if (!team) return res.status(404).json({ message: 'Not found!' });
    return res.status(200).json(team);
  } catch (e) {
    next(e);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await getByIdTeams(id);
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export { getAll, getById };
