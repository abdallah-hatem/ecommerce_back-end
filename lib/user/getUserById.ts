// import User from "./interfaces.js";

const { prisma } = require("../../config/prisma");

export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
}
