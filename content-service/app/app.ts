import express = require('express');
import cors from 'cors';
import * as bodyParser from "body-parser";
import router from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(router);

export default app;




