/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Pokemon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pokemon" DROP CONSTRAINT "Pokemon_ownerId_fkey";

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "ownerId";

-- CreateTable
CREATE TABLE "UserPokemon" (
    "userId" INTEGER NOT NULL,
    "pokemonId" INTEGER NOT NULL,

    CONSTRAINT "UserPokemon_pkey" PRIMARY KEY ("userId","pokemonId")
);

-- AddForeignKey
ALTER TABLE "UserPokemon" ADD CONSTRAINT "UserPokemon_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPokemon" ADD CONSTRAINT "UserPokemon_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
