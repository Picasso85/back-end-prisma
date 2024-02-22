import { PrismaClient } from "@prisma/client";

const filterProperty = async (location, pricePerNight, amenitis) => {
  const prisma = new PrismaClient();
  const properties = await prisma.property.findMany({
    where: {
      location: { contains: location },
      pricePerNight: { contains: pricePerNight },
      amenitis: { contains: amenitis }, //amenitis geen typo hier, maar typo in schema Properties
    },
  });
  return properties;
};

export default filterProperty;
