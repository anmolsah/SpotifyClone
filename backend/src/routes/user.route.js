import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to user route");
});

export default router;
