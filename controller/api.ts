import { Request, Response } from 'express';
import ApiError from '../entities/ApiError';
import {User} from '../domain/user'
import {update, retrieve, claim} from '../repository/userCollection';

export const updateUsers = async (req: Request, res: Response) => {
  try {
    const userId = req?.query?.id as string;
    const userData = req?.body?.data as User;
    await update(userId, userData);
    res.status(200).json({statusCode: 200, text: 'User updated'});
  } catch (error) {
    res.status(500).json(new ApiError(500, (error as Error).message));
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userId = req?.query?.id as string;
    const userDoc = await retrieve(userId);
    if (!userDoc) {
      res.status(404).json(new ApiError(404, 'User not found'));
    } else {
      res.status(200).json({data: userDoc, text: 'get user successful', statusCode: 200});
    }
  } catch (error) {
    res.status(500).json(new ApiError(500, (error as Error).message));
  }
};

export const claimToken = async (req: Request, res: Response) => {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
      res.status(401).json(new ApiError(401, 'Access token not found'));
  }
  try {
    const claimedToken = await claim(idToken);
    res.status(200).json({data: claimedToken, text: 'get claimed token successful', statusCode: 200});
  } catch (error) {
    console.error('Error setting custom claims:', error);
    res.status(500).json(new ApiError(500, (error as Error).message));
  }
};