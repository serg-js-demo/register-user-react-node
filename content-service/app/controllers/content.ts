import { Request, Response } from 'express';
import { getConnection } from '../database';

export async function privateCtrl(req: Request, res: Response) {
	res.status(200).send("SOME PRIVATE CONTENT. It is available only for registered users.");
}


export async function publicCtrl(req: Request, res: Response) {
	res.status(200).send("SOME PUBLIC CONTENT. Please, Sign in to see private content.");
}