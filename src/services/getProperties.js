import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findMany({
    where: { location, pricePerNight, amenities },
  });
  return property;
};

export default getProperties;
