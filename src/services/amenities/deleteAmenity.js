import { PrismaClient } from "@prisma/client";

const deleteAmenity = async id => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.deleteMany({
    where: { id },
  });
  return amenity.count > 0 ? id : null;
};

export default deleteAmenity;
