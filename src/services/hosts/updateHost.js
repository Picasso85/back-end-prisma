import { PrismaClient } from "@prisma/client";

const updateHost = async (id, updatedHost) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.updateMany({
    where: { id },
    data: updatedHost,
  });
  return host.count > 0 ? id : null;
};

export default updateHost;
