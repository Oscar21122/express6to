// const express = require("express");

import "dotenv/config"
import express from "express"
import cors from "cors"
import indexRoutes from "./routes/indexroutes.js"
import itemsRoutes from "./routes/itemsroutes.js"
import items2Routes from "./routes/items2routes.js"
import loginRoutes from "./routes/loginroutes.js"
import morgan from "morgan"
import { connectDB } from "./utils/mongodb.js"

const app = express();

connectDB()

app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use(indexRoutes)
app.use(itemsRoutes)
app.use(items2Routes)
app.use(loginRoutes)

app.listen(5001, console.log("http://localhost:5001"));

