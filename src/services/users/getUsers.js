import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: {
      username,
      email,
    },
  });

  return users;
};

export default getUsers;
