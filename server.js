// import express from "express";
// import bodyParser from "body-parser";
// import  cors from "cors";
// import router from "./routes/expenseRoutes.js";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/expenseRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(express.static("public"));


app.use("/expenses", router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));