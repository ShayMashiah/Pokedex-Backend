import * as userRepository from '../repositories/userRepositry';
import { NotFoundError, InternalServerError, CreationError } from '../handlers/errors';

export async function getAllUsers() {
  try {
    const users = await userRepository.findAllUsers();
    if (!users || users.length === 0) {
      throw new NotFoundError('No users found');
    }
    return users;
  } catch (error) {
    console.error('Error in getAllUsers service:', error);
    if (error && typeof error === 'object' && 'statusCode' in error) throw error;
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
    console.error('Error in addNewUser service:', error);
    if (error && typeof error === 'object' && 'statusCode' in error) throw error;
    throw new CreationError('Failed to create new user');
  }
}
