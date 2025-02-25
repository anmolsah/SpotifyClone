import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to auth route");
});

export default router;
