import express from 'express';
import { updateUsers, getUsers, claimToken } from '../controller/api';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.put('/update-user-data', authMiddleware, updateUsers);
router.get('/fetch-user-data', getUsers);
router.post('/claim-token', claimToken);

export default router;
