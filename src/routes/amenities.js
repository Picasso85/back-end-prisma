import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenity from "../services/amenities/updateAmenity.js";
import auth from "../utils/auth.js";
import createAmenity from "../services/amenities/createAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const amenities = await getAmenities();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);
    if (!amenity) {
      res.status(404).json({ message: `Amenity with id ${id} not found!` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const amenity = await updateAmenity(id, { name });

    if (!amenity) {
      res.status(404).json({ message: `Amenity with id${id} not found!` });
    } else {
      res.status(200).json({ message: `Amenity updated!` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await deleteAmenity(id);

    if (!amenity) {
      res.status(404).json({ message: `Amenity with id${id} not found!` });
    } else {
      res.status(200).json({ message: `Amenity deleted!` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
