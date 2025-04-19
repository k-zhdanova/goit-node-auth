import bcrypt from 'bcryptjs';
import User from '../models/User.js';

export async function createUser({ email, password }) {
	const hash = await bcrypt.hash(password, 10);
	const user = await User.create({ email, password: hash });
	return { id: user.id, email: user.email, subscription: user.subscription };
}

export async function findUserByEmail(email) {
	return await User.findOne({ where: { email } });
}

export async function saveUserToken(userId, token) {
	await User.update({ token }, { where: { id: userId } });
}

export async function removeUserToken(userId) {
	await User.update({ token: null }, { where: { id: userId } });
}
