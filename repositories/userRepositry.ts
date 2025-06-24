import prisma from '../lib/prisma';


export async function findAllUsers() {
  const users = await prisma.$queryRaw`SELECT * FROM "User"`;
  return users;
}

export async function findUserById(id: number) {
    const user = await prisma.$queryRaw`SELECT * FROM "User" WHERE id = ${id}`;
    return user[0] ?? null;
}

export async function addNewUser() {
  const newUser = await prisma.user.create({
    data: {},
  });

  return newUser;
}

