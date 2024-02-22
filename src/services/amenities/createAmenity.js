import { PrismaClient } from "@prisma/client";

const createAmenity = async name => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.create({
    data: { name },
  });
  return amenity;
};

export default createAmenity;
