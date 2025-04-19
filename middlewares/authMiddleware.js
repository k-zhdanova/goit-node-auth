import { verifyToken } from '../helpers/jwt.js';
import HttpError from '../helpers/HttpError.js';
import User from '../models/User.js';

export default async function auth(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const [type, token] = authHeader.split(' ');

	if (type !== 'Bearer' || !token) {
		return next(HttpError(401));
	}

	try {
		const { id } = verifyToken(token);
		const user = await User.findByPk(id);

		if (!user || user.token !== token) {
			return next(HttpError(401));
		}

		req.user = user;
		next();
	} catch {
		next(HttpError(401));
	}
}
