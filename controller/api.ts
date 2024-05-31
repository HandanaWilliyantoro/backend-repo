import { Request, Response } from 'express';
import ApiError from '../entities/ApiError';
import {User} from '../domain/user'
import {update, retrieve} from '../repository/userCollection';

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