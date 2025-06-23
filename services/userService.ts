import * as userRepository from '../repositories/userRepositry';
import { NotFoundError, CreationError } from '../handlers/errors';

export async function getAllUsers() {
  const users = await userRepository.findAllUsers();
  if (!users || users.length === 0) {
    throw new NotFoundError('No users found');
  }
  return users;
}

export async function addNewUser() {
  const newUser = await userRepository.addNewUser();
  if (!newUser) {
    throw new CreationError('Failed to create new user');
  }
  return newUser;
}
