import HttpError from '../helpers/HttpError.js';
import {
	createUser,
	findUserByEmail,
	saveUserToken,
	removeUserToken,
} from '../services/usersServices.js';
import { signToken } from '../helpers/jwt.js';
import bcrypt from 'bcryptjs';

export async function register(req, res, next) {
	try {
		const { email, password } = req.body;
		if (await findUserByEmail(email)) {
			throw HttpError(409, 'Email in use');
		}
		const userData = await createUser({ email, password });
		res.status(201).json({ user: userData });
	} catch (err) {
		next(err);
	}
}

export async function login(req, res, next) {
	try {
		const { email, password } = req.body;
		const user = await findUserByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw HttpError(401, 'Email or password is wrong');
		}
		const token = signToken({ id: user.id });
		await saveUserToken(user.id, token);
		res.json({
			token,
			user: { email: user.email, subscription: user.subscription },
		});
	} catch (err) {
		next(err);
	}
}

export async function logout(req, res, next) {
	try {
		const userId = req.user.id;
		await removeUserToken(userId);
		res.status(204).end();
	} catch (err) {
		next(err);
	}
}

export async function current(req, res, next) {
	try {
		const { email, subscription } = req.user;
		res.json({ email, subscription });
	} catch (err) {
		next(err);
	}
}
