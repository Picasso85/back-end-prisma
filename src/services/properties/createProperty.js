import { PrismaClient } from "@prisma/client";

const createProperty = async (
  hostId,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  rating
) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    },
  });

  return property;
};

export default createProperty;
