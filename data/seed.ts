import prisma from '../lib/prisma';
import fs from 'fs/promises';
import path from 'path';

async function main() {
  
    const jsonPath = path.resolve(__dirname, 'pokemon_.json');
  const fileContent = await fs.readFile(jsonPath, 'utf-8');
  const pokemons = JSON.parse(fileContent);

  await prisma.pokemon.deleteMany();

  for (const pkm of pokemons) {
    await prisma.pokemon.create({
      data: {
        id: pkm.id,
        nameEnglish: pkm.name.english,
        nameJapanese: pkm.name.japanese,
        nameChinese: pkm.name.chinese,
        nameFrench: pkm.name.french,
        type: pkm.type,
        hp: pkm.base.HP,
        attack: pkm.base.Attack,
        defense: pkm.base.Defense,
        spAttack: pkm.base["Sp. Attack"],
        spDefense: pkm.base["Sp. Defense"],
        speed: pkm.base.Speed,
        species: pkm.species,
        description: pkm.description,
        evolution: pkm.evolution || null,
        profile: pkm.profile || null,
        image: pkm.image || null,
      },
    });
  }

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
