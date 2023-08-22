const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function dbConnect() {
  await prisma.$connect();
}

dbConnect()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = { dbConnect, prisma };
