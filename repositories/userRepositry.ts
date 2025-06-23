import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findAllUsers() {
  const users = await prisma.$queryRaw`SELECT * FROM "User"`;
  return users;
}

export async function addNewUser() {
  const newUser = await prisma.user.create({
    data: {},
  });

  return newUser;
}

