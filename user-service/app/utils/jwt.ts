import fs from 'fs';
import path from 'path';
import { sign as jwtSign } from 'jsonwebtoken';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../keys/rsa_private.pem'), 'utf8');

export function createToken(userId: number): string {
	const token = jwtSign({
		userId
	}, privateKey, {
		algorithm: 'RS256',
		expiresIn: 1000 * 24,
	});

	return token;
}