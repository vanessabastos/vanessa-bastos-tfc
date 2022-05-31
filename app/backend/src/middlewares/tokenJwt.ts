import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IUser } from '../interfaces/Users';

const SECRET = fs.readFileSync('jwt.evaluation.key');

const authorization = (payload: IUser) => {
  const { email, role } = payload;
  const token = jwt.sign({ email, role }, SECRET);

  return token;
};

const verifyToken = (token: string) => {
  if (token === undefined || !token) return false;
  const { role } = jwt.verify(token, SECRET) as IUser;

  return role;
};

export { authorization, verifyToken };
