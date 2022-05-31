import { Request, Response, NextFunction } from 'express';
import { authorization } from '../middlewares/tokenJwt';
import { IUser } from '../interfaces/Users';
import * as services from '../services/loginServices';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const user = await services.login(email);

    if (!user) return res.status(400).json({ message: 'Incorrect email' });

    const token = authorization(user as IUser);
    const result = { user, token };

    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

export default login;
