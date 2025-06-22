import e from 'express';
import * as userRepository from '../repositories/userRepositry';

export async function getAllUsers() {
  return await userRepository.findAllUsers();
}

export async function addNewUser() {
    return await userRepository.addNewUser();
}
