// const express = require("express");

import express from "express"
import indexRoutes from "./routes/indexroutes.js"
import itemsRoutes from "./routes/itemsroutes.js"
import loginRoutes from "./routes/loginroutes.js";

const app = express();

app.use(express.json());
app.use(indexRoutes)
app.use(itemsRoutes)
app.use(loginRoutes);

app.listen(5001, console.log("http://localhost:5001"));

