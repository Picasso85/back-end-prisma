import userData from "../data/users.json" assert { type: "json" };
import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;
  const { users } = userData;
  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "wrong username and/or password!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Succesfully logged in!", token });
});

export default router;
