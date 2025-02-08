import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

async function main() {
  console.log('Starting database seeding...');

  // Hash passwords for users
  const users = await Promise.all([
    { email: 'user1@example.com', username: 'user1', password: await hashPassword('password1') },
    { email: 'user2@example.com', username: 'user2', password: await hashPassword('password2') },
    { email: 'user3@example.com', username: 'user3', password: await hashPassword('password3') },
  ]);

  const projects = await prisma.project.createMany({
    data: [
      { apiProjectId: 1, name: 'Plantation 1', description: 'Plantation 1', latitude: 1, longitude: 1, minPrice: 10 },
      { apiProjectId: 2, name: 'Plantation 2', description: 'Plantation 2', latitude: 1, longitude: 1, minPrice: 5 },
    ],
  });

  const allProjects = await prisma.project.findMany();

  const trees = await prisma.tree.createMany({
    data: [
      { apiTreeId: 1, projectId: allProjects[0].id, name: 'Pine', price: 10, stock: 100 },
      { apiTreeId: 2, projectId: allProjects[0].id, name: 'Rose', price: 5, stock: 50 },
      { apiTreeId: 3, projectId: allProjects[1].id, name: 'Lily', price: 3, stock: 30 },
      { apiTreeId: 4, projectId: allProjects[1].id, name: 'Oak', price: 8, stock: 20 },
    ],
  });

  const allTrees = await prisma.tree.findMany();

  // Create category
  const category = await prisma.category.create({
    data: {
      name: 'Fruits',
    },
  });

  // Create tree details
  const treeDetails = [
    {
      treeId: allTrees[0].id,
      commonNames: 'Pine',
      family: 'Pinaceae',
      particularities: 'Hardy',
      planterLikes: 'Shady',
      foliageType: 'Evergreen',
      height: '10-15',
      imageUrl: 'https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp',
      lifeSpan: 100,
      lifetimeCo2: 300,
      co2Offset: 30,
      co2OffsetPeriod: 'Annual',
      categoryId: category.id,
    },
    {
      treeId: allTrees[1].id,
      commonNames: 'Rose',
      family: 'Rosaceae',
      particularities: 'Hardy',
      planterLikes: 'Shady',
      foliageType: 'Deciduous',
      height: '5-10',
      imageUrl: 'https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp',
      lifeSpan: 50,
      lifetimeCo2: 200,
      co2Offset: 20,
      co2OffsetPeriod: 'Annual',
      categoryId: category.id,
    },
    {
      treeId: allTrees[2].id,
      commonNames: 'Lily',
      family: 'Liliaceae',
      particularities: 'Hardy',
      planterLikes: 'Shady',
      foliageType: 'Deciduous',
      height: '3-5',
      imageUrl: 'https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp',
      lifeSpan: 30,
      lifetimeCo2: 100,
      co2Offset: 10,
      co2OffsetPeriod: 'Annual',
      categoryId: category.id,
    },
    {
      treeId: allTrees[3].id,
      commonNames: 'Oak',
      family: 'Quercus',
      particularities: 'Hardy',
      planterLikes: 'Shady',
      foliageType: 'Deciduous',
      height: '10-15',
      imageUrl: 'https://treenation-uploads.s3.eu-central-1.amazonaws.com/project-efa7732a9f5e5bdc2163ac00954b0ded.webp',
      lifeSpan: 100,
      lifetimeCo2: 300,
      co2Offset: 30,
      co2OffsetPeriod: 'Annual',
      categoryId: category.id,
    },
  ];

  await prisma.treeDetails.createMany({
    data: treeDetails,
  });

  // Create users and assign initial credits
  for (let user of users) {
    const newUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });

    await prisma.credit.create({
      data: {
        userId: newUser.id,
        creditsEarned: 100,
        creditsConsumed: 10,
      },
    });

    const low = 1;
    const high = 10;
    const randomNumber = Math.floor(Math.random() * (high - low + 1)) + low;
    for (let i = 0; i < randomNumber; i++) {
      await prisma.order.create({
        data: {
          userId: newUser.id,
          treeId: 1,
          quantity: 5,
          date: new Date(),
          totalPrice: 50,
          status: i % 2 ? 'COMPLETED' : 'PENDING'
        }
      }); 
    }
  }
  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
