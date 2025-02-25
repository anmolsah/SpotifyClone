import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to stat route");
});

export default router;
