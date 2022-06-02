import { Router } from 'express';
import listMatches from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', listMatches);

export default matchesRouter;
