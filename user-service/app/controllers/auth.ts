import { Request, Response } from 'express';
import { getConnection } from '../database';
import bcrypt from 'bcryptjs';
import { genUUID } from '../utils/uuid';

import { createToken } from '../utils/jwt';

export interface User {
	id: string;
	name: string;
	username: string;
	password: string;
}

	
export async function info(req: Request, res: Response) {
	res.status(200).send('OK');
}

export async function logout(req: Request, res: Response) {
	res.status(200).send('OK');
}

export async function  signin(req: Request, res: Response) {
	const { username, password } = req.body;

	const db = await getConnection()
	const user = await db('users').where({ username }).first();

	if (!user) {
		return res.status(404).send({ message: "User Not found." });
	}

	const passwordIsValid = await bcrypt.compare(password, (user as User).password);

	if (!passwordIsValid) {
		return res.status(401).send({
			message: 'Invalid Password'
		});
	}

	const token = createToken(user.id);

	res.json({
		username: user.username,
		email: user.email,
		accessToken: token,
	})
}

export async function signup(req: Request, res: Response) {

	const db = await getConnection();
	const { name, username, email, password } = req.body;

	if (!name || !username || !email || !password) {
		return res.status(422).send({ message: "User Not found." });
	}

	const existingUser = await db('users').where({ email }).orWhere({ username }).first();

	if (existingUser) {
		return res.status(409).send({ message: "User already exists." });
	}

	const hashedPass = await bcrypt.hash(password, 8);
	const uid = genUUID();

	await db('users').insert({
		name,
		username,
		email,
		id: uid,
		password: hashedPass
	});

	const registeredUser = await db('users').where({ id: uid }).first();
	const token = createToken(registeredUser.id);

	res.json({
		accessToken: token,
		message: "User registered successfully!",
	})
}

  