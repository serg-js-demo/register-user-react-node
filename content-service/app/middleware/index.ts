import { Request, Response } from 'express';
import { decode as jwtDecode, sign as jwtSign, verify as jwtVerify, VerifyOptions } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/rsa_public.pem'), 'utf8');

export interface RequestCustom extends Request {
    userId: string;
}

export function verifyToken(req: Request, res: Response, next: Function) {

    const token = req.headers["x-access-token"] as string;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwtVerify(token, publicKey, <VerifyCallback>(err: any, decoded: any) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        (req as RequestCustom).userId = decoded.userId;
        next();
    });
};

