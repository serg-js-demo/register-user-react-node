import express = require('express');
import { Request, Response } from 'express';
import cors from 'cors';
import { getConnection, migrateDb } from './database';
import { verifyToken, RequestCustom } from './middleware';
import * as bodyParser from "body-parser";
import router from './routes';

const PORT = process.env.USER_SERVICE_PORT || '3001';
const app: express.Application = express();

export async function init() {
    await getConnection();
    await migrateDb();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(router);

    app.listen(PORT, function () {
        console.log(`User service app listening on port ${PORT}!`);
    });

}

init();






