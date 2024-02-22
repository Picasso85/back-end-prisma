import { PrismaClient } from "@prisma/client";

const getPropertyWithAmenities = async propertyId => {
  const prisma = new PrismaClient();
  const propertyAmenities = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { amenities: true },
  });
  if (!propertyAmenities) {
    throw new errorHandler("property", propertyId);
  }
  return propertyAmenities;
};

export default getPropertyWithAmenities;
