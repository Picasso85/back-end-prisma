import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenitis) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findMany({
    where: { location, pricePerNight, amenitis },
  });
  return property;
};

export default getProperties;
