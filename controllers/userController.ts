import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Failed to fetch users:', error);

    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const err = error as { statusCode: number; message: string };
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

async function addNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await userService.addNewUser();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Failed to create user:', error);

    if (typeof error === 'object' && error !== null && 'statusCode' in error) {
      const err = error as { statusCode: number; message: string };
      res.status(err.statusCode).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default {
  getAllUsers,
  addNewUser,
};

