import { Request, Response, NextFunction } from 'express';
import { listMatch, create, patchMatches } from '../services/matchesServices';

const listMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await listMatch();

    if (matches === null) return res.status(404).json({ message: 'Matches not found!' });

    return res.status(200).json(matches);
  } catch (e) {
    next(e);
  }
};

const createMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMatches = req.body;
    const resultMatches = await create();

    if (!newMatches) return res.status(404).json({ message: 'There is no team with such id!' });

    return res.status(201).json(resultMatches);
  } catch (e) {
    next(e);
  }
};

const matchePatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await patchMatches(+id);

    if (!result) return res.status(404).json({ message: '"Matches" not found!' });
    return res.status(200).json({ message: 'Finished' });
  } catch (e) {
    next(e);
  }
};

export default { listMatches, createMatches, matchePatch };
