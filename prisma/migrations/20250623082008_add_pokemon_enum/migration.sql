/*
  Warnings:

  - You are about to drop the column `evolution` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nameChinese` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nameFrench` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `nameJapanese` on the `Pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `Pokemon` table. All the data in the column will be lost.
  - The `type` column on the `Pokemon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PokemonType" AS ENUM ('Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon', 'Steel', 'Fairy');

-- AlterTable
ALTER TABLE "Pokemon" DROP COLUMN "evolution",
DROP COLUMN "image",
DROP COLUMN "nameChinese",
DROP COLUMN "nameFrench",
DROP COLUMN "nameJapanese",
DROP COLUMN "profile",
ADD COLUMN     "ability1" TEXT,
ADD COLUMN     "ability1Hidden" BOOLEAN DEFAULT false,
ADD COLUMN     "ability2" TEXT,
ADD COLUMN     "ability2Hidden" BOOLEAN DEFAULT false,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "hires" TEXT,
ADD COLUMN     "sprite" TEXT,
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "weight" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "PokemonType"[];
