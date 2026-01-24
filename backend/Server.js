const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const database = mysql.createPool({
  host: "loaclhost",
  user: "root",
  password: "",
  database: "mana_it_solutions"
});

// Assigning PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running successfully!\nPORT: ${PORT}`);
});