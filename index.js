// const express = require("express");

import express from "express"
import indexRoutes from "./routes/indexroutes.js"

const app = express();

app.use(indexRoutes)

app.listen(5001, console.log("http://localhost:5001"));

