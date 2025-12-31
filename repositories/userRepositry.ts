import prisma from '../lib/prisma';
import { User } from '../lib/types';

export async function findAllUsers(): Promise<User[]> {
  const users = await prisma.$queryRaw<User[]>`SELECT * FROM "User"`;
  return users;
}

export async function findUserById(id: number) {
    const user = await prisma.$queryRaw<User[]>`SELECT * FROM "User" WHERE id = ${id}`;
    return user[0] ?? null;
}

export async function addNewUser() {
  const newUser = await prisma.user.create({
    data: {},
  });

  return newUser;
}

