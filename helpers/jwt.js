import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
	throw new Error('JWT_SECRET is not defined in environment');
}

export function signToken(payload) {
	return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token) {
	return jwt.verify(token, SECRET);
}
