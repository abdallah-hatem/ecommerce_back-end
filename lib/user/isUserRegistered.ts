import User from "./interfaces.js";

const {prisma} = require("../../config/prisma");

export async function isUserRegistered(email: string) {
  const user: User = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
