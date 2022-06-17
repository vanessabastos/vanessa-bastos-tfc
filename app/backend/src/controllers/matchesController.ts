import { Request, Response, NextFunction } from 'express';
import { listMatch, create, patchMatches, updateMatches } from '../services/matchesServices';

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
    const { homeTeam, awayTeam } = newMatches;
    const resultMatches = await create(newMatches);

    if (!resultMatches) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

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

const matchesUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await updateMatches(+id, req.body);
    if (result) return res.status(200).json({ message: 'Match updated!' });
  } catch (e) {
    next(e);
  }
};

export default { listMatches, createMatches, matchePatch, matchesUpdate };
