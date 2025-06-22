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

async function addNewUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await userService.addNewUser();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}

export default {getAllUsers, addNewUser}