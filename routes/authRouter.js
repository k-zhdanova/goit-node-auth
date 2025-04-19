import express from 'express';
import { register, login, logout, current } from '../controllers/authControllers.js';
import validateBody from '../helpers/validateBody.js';
import auth from '../middlewares/authMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/authSchemas.js';

const authRouter = express.Router();

authRouter.post('/register',
	validateBody(registerSchema),
	register
);

authRouter.post('/login',
	validateBody(loginSchema),
	login
);

authRouter.post('/logout', auth, logout);
authRouter.get('/current', auth, current);

export default authRouter;
