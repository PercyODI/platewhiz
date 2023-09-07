import { PrismaClient } from '@prisma/client';

console.log("env " + process.env.DATABASE_URL)

const prisma = new PrismaClient();

async function main() {
  await prisma.ingredient.create({
    data: {
      name: 'Blueberries',
      nutrition: {
        servingSize: {
          value: 0.5,
          measurement: 'cup',
        },
        calories: 42,
        protein: 1,
        fat: 1,
        carbs: 11,
        sugar: 7,
        sodium: 0,
      },
    },
  });

  const allIngredients = await prisma.ingredient.findMany();
  console.log(allIngredients);
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
