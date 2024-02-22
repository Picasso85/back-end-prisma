import { PrismaClient } from "@prisma/client";

const filterProperty = async (location, pricePerNight, amenities) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: { contains: location },
      pricePerNight: { contains: pricePerNight },
      amenities: { contains: amenities },
    },
  });
  return properties;
};

export default filterProperty;
