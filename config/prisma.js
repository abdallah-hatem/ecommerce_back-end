const { PrismaClient } = require("@prisma/client");

function dbUrl() {
  if (process.env.NODE_ENV === "production") {
    return {
      url: process.env.POSTGRES_PRISMA_URL,
    };
  }

  return {
    url: process.env.DATABASE_URL,
  };
}

const prisma = new PrismaClient({
  datasources: {
    db: dbUrl(),
  },
});
// const prisma = new PrismaClient();

module.exports = { prisma };
