import { Router } from "express";
import { login } from "../controllers/logincontrollers.js"

const router = Router();

router.post("/login/", login)

export default router