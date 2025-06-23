import { PrismaClient } from '@prisma/client';
import * as fs from 'fs/promises';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const jsonPath = path.join(__dirname, './pokemon_.json');
  const fileContent = await fs.readFile(jsonPath, 'utf-8');
  const data = JSON.parse(fileContent);

  await prisma.userPokemon.deleteMany();
  await prisma.pokemon.deleteMany();
  await prisma.user.deleteMany();

  for (const p of data) {
    const pokemon = await prisma.pokemon.create({
      data: {
        id: p.id,
        nameEnglish: p.name.english,

        type: p.type,

        hp: p.base.HP,
        attack: p.base.Attack,
        defense: p.base.Defense,
        spAttack: p.base["Sp. Attack"],
        spDefense: p.base["Sp. Defense"],
        speed: p.base.Speed,

        species: p.species ?? '',
        description: p.description ?? '',

        height: p.profile?.height ?? null,
        weight: p.profile?.weight ?? null,
        gender: p.profile?.gender ?? null,
        ability1: p.profile?.ability?.[0]?.[0] ?? null,
        ability1Hidden: p.profile?.ability?.[0]?.[1] === 'true',
        ability2: p.profile?.ability?.[1]?.[0] ?? null,
        ability2Hidden: p.profile?.ability?.[1]?.[1] === 'true',

        sprite: p.image?.sprite ?? null,
        thumbnail: p.image?.thumbnail ?? null,
        hires: p.image?.hires ?? null,

      },
    });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });

