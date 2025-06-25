import * as userRepository from '../repositories/userRepositry';
import { NotFoundError, InternalServerError, CreationError } from '../handlers/errors';
import { User } from '../lib/types';


export async function getAllUsers(): Promise<User[]>  {
  try {
    const users : User[] = await userRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }
    return users;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error('Error in getAllUsers service:', error);
    throw new InternalServerError('Failed to fetch users');
  }
}

export async function addNewUser() {
  try {
    const newUser = await userRepository.addNewUser();
    if (!newUser) {
      throw new CreationError('Failed to create new user');
    }
    return newUser;
  } catch (error) {
    if (error instanceof CreationError) {
      throw error;
    }
    console.error('Error in addNewUser service:', error);
    throw new CreationError('Failed to create new user');
  }
}
