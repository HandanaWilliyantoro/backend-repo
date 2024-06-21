import * as dotenv from 'dotenv';
dotenv.config();

import {onRequest} from "firebase-functions/v2/https";
import express from 'express';
import userRoutes from '../routes/userRoutes';

const app = express();

app.use(express.json());
app.use('/', userRoutes);

export const api = onRequest(app);
