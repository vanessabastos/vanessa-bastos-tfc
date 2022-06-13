import { Router } from 'express';
import matchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.post('/', matchesController.createMatches);
matchesRouter.get('/', matchesController.listMatches);
matchesRouter.patch('/:id/finish', matchesController.matchePatch);

export default matchesRouter;
