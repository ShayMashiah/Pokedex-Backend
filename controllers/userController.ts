import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export default {getAllUsers}