import { Router } from "express";
import { login } from "../controllers/authcontrollers.js";
import { signup } from "../controllers/authcontrollers.js";

const router = Router();

router.post("/login", login); // Ruta para iniciar sesión
router.post("/signup", signup); // Ruta para registrar un nuevo usuario

export default router;
