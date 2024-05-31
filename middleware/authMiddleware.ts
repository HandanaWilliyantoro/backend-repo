import { Request, Response, NextFunction } from 'express';
import ApiError from '../entities/ApiError';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json(new ApiError(401, 'Authentication token not provided'));
  }

  try {
    return next();
  } catch (error) {
    res.status(500).json(new ApiError(500, (error as Error).message));
  }
};

export default authMiddleware;
