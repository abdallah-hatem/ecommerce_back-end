const { PrismaClient } = require("@prisma/client");

function dbUrl() {
  if (process.env.NODE_ENV === "production") {
    return {
      url: process.env.POSTGRES_PRISMA_URL,
      // directUrl: process.env.POSTGRES_URL_NON_POOLING,
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

module.exports = { prisma };
