import { PrismaClient } from "@prisma/client";

const updateUser = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({
    where: { id },
    data: updatedUser,
  });

  return user.count > 0 ? id : null;
};

export default updateUser;
