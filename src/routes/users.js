import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";
import auth from "../utils/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const users = await getUsers(username, email);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    if (!user) {
      res.status(404).json({ message: `Couldn't find user with id ${id}` });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({
      message: `Failed to create User. Please check your request.`,
    });
    next(error);
  }
});
router.put("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, username, password, phoneNumber, email, profilePicture } =
      req.body;
    const user = await updateUser(id, {
      name,
      username,
      password,
      phoneNumber,
      email,
      profilePicture,
    });

    if (user) {
      res.status(200).send({
        message: `User with id ${id} successfully updated`,
        user,
      });
    } else {
      res.status(404).json({ message: `User with id ${id} not found` });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);

    if (!user) {
      res.status(404).json({ message: `Could not find user with id ${id}!` });
    } else {
      res.status(200).json({ message: `User with id ${id} has been deleted` });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
