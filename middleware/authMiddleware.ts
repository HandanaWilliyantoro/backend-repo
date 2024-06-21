import { Request, Response, NextFunction } from 'express';
import ApiError from '../entities/ApiError';
import { admin, db } from '../config/firebaseConfig';

import { DecodedIdToken } from 'firebase-admin/auth';

declare module 'express-serve-static-core' {
  interface Request {
    user?: DecodedIdToken;
  }
}

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  const userId = req?.query?.id as string; 

  if (!token) {
    return res.status(401).json(new ApiError(401, 'Authentication token not provided'));
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    const {role, uid} = decodedToken
    console.log(role, '<< role')

    if(role === 'admin'){
      req.user = decodedToken;
      return next();
    }

    if(userId === uid){
      return next();
    }

    res.status(401).json(new ApiError(401, 'You are not authorized to do this!'));

  } catch (error) {
    res.status(500).json(new ApiError(500, (error as Error).message));
  }
};

export default authMiddleware;
