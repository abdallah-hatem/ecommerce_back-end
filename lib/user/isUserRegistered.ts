const { prisma } = require("../../config/prisma");

interface User {
  name: string;
  email: string;
  password: string;
}

export async function isUserRegistered(email: string) {
  const user: User = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}
