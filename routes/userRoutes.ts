// routes/userRoutes.ts
import express from 'express';
import { updateUsers, getUsers } from '../controller/api';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.put('/update-user-data', authMiddleware, updateUsers);
router.get('/fetch-user-data', getUsers);

export default router;
