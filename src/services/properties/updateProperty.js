import { PrismaClient } from "@prisma/client";

const updateProperty = async (id, updatedProperty) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.updateMany({
    where: { id },
    data: updatedProperty,
  });
  return property.count > 0 ? id : null;
};

export default updateProperty;
