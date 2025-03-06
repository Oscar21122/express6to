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

    const user = data.recordset[0];
    const isLogin = user.password === req.body.password;

    if (isLogin) {
        res.status(200).json({ isLogin, user });
    } else {
        res.status(401).json({ isLogin, user: {} });
    }
};