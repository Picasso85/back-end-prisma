import { PrismaClient } from "@prisma/client";

const getAmenities = async () => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany({
    where: {},
  });
  return amenities;
};

export default getAmenities;
