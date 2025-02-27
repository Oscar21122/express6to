import { sqlConnect, sql } from "../utils/sql.js"

export const getItems = async (req, res) => {
    try {
        const pool = await sqlConnect();
        const data = await pool.request().query("SELECT * FROM Items");
        
        console.log("Users data:", data.recordset); // Ver si hay datos
        res.json(data.recordset);
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const getItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM Items Where id = @id")
    res.json(data.recordset)
}

export const postItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Decimal, req.body.price)
        .query("INSERT INTO Items (name, price) VALUES (@name, @price)")
    res.status(201).json({ message: "Item creado exitosamente" });
}

export const putItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, req.body.name)
        .input("price", sql.Decimal, req.body.price)
        .query("UPDATE Items SET name=@name, price=@price Where id = @id")
    res.status(201).json({ message: "Item actualizado exitosamente" });
}

export const deleteItem = async (req, res) => {
    const pool = await sqlConnect();
    const data = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM Items Where id = @id")
    res.status(201).json({ message: "Item borrado exitosamente" });
}