import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './tokenJwt';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const REGEXEMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const { email } = req.body;

  if (!email || email === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!REGEXEMAIL.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (password.length < 7) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || authorization === undefined) {
      return res.status(401).json({ message: 'Token unauthorized' });
    }

    const result = verifyToken(authorization as string);

    if (typeof result === 'string') {
      return res.status(200).json(result);
    }
    return res.status(401).json({ message: 'Unauthoried' });
  } catch (e) {
    next(e);
  }
};
export { validateEmail, validatePassword, validateLogin };
