import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { BadRequestError, NotFoundError } from '../handlers/errors';

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function addNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await userService.addNewUser();
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
      return;
    }
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error('Error in addNewUser:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default {
  getAllUsers,
  addNewUser,
};
