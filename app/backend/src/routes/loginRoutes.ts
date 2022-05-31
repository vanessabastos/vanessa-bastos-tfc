import * as express from 'express';
import loginController from '../controllers/loginController';
import { validateEmail, validateLogin, validatePassword } from '../middlewares/loginValidation';

const login = loginController;

const loginRouter = express.Router();

loginRouter.post('/', validateEmail, validatePassword, login);
loginRouter.get('/validate', validateLogin);

export default loginRouter;
