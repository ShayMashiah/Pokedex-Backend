import * as userRepository from '../repositories/userRepositry';

export async function getAllUsers() {
  return await userRepository.findAllUsers();
}
