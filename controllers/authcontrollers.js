import { sqlConnect, sql } from "../utils/sql.js"
import crypto from "crypto";

const generateHash = (password) => {
    const salt = crypto.randomBytes(24).toString("base64url"); // Genera una sal aleatoria de 24 bytes
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("base64url"); // Hashea con PBKDF2
    return `${salt}:${hash}`; // Guarda como "sal:hash"
};

const verifyPassword = (inputPassword, storedPassword) => {
    const [salt, storedHash] = storedPassword.split(":"); // Extrae la sal y el hash de la DB
    const hash = crypto.pbkdf2Sync(inputPassword, salt, 100000, 64, "sha512").toString("base64url"); // Hashea con la misma sal
    return hash === storedHash; // Compara los hashes
};


export const signup = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Usuario y contraseña requeridos" });
    }

    const hashedPassword = generateHash(password); // Hashear la contraseña

    const pool = await sqlConnect();
    await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, hashedPassword)
        .query("INSERT INTO Users (username, password) VALUES (@username, @password)");

    res.status(201).json({ message: "Usuario registrado correctamente" });
};


export const login = async (req, res) => {
    const { username, password } = req.body;
    const pool = await sqlConnect();
    
    const data = await pool
        .request()
        .input("username", sql.VarChar, username)
        .query("SELECT * FROM Users WHERE username=@username");

    if (data.recordset.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = data.recordset[0];
    const isLogin = verifyPassword(password, user.password); // Compara la contraseña

    if (isLogin) {
        res.status(200).json({ isLogin, user });
    } else {
        res.status(401).json({ error: "Credenciales incorrectas" });
    }
};
