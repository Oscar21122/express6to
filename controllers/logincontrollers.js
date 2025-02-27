import { sqlConnect, sql } from "../utils/sql.js"

export const login = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("username", sql.VarChar, req.body.username)
        .query("SELECT * FROM Users where username=@username")
    if (data.recordset.length === 0) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("Usuario en BD:", data.recordset[0]);
    console.log("Usuario enviado:", req.body);

    let isLogin = (data.recordset[0].password === req.body.password) 
    res.status(200).json({ isLogin : isLogin });
};