const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const database = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mana_it_solutions"
});

/*
  GET: All users
*/
app.get("/api/get/users/all", async (req, res) => {
  try {
    const [users] = await database.query("SELECT * FROM users");
    res.status(200).json({
      message: "Fetched users successfully",
      users
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database fetch error"
    });
  }
});

/*
  GET: All messages
*/
app.get("/api/get/messages/all", async (_, res) => {
  try {
    const [messages] = await database.query("SELECT * FROM messages");
    res.status(200).json({
      message: "Fetched messages successfully",
      messages
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Database fetch error"
    })
  }
})

/*
  POST: Send message (contact form)
*/
app.post("/api/send-message", async (req, res) => {
  console.log("API called: /api/send-message");
  const { name, email, phone, message } = req.body;

  try {
    // 1. Check if the user exists first
    const [existingUsers] = await database.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    let userId;

    if (existingUsers.length > 0) {
      userId = existingUsers[0].id;

      // 2. Since user exists, check if they already sent THIS exact message
      const [existingMessage] = await database.query(
        "SELECT id FROM messages WHERE user_id = ? AND message = ?",
        [userId, message]
      );

      if (existingMessage.length > 0) {
        return res.status(409).json({ message: "Message already sent!" });
      }
    } else {
      // 3. User doesn't exist, so create them
      const [userInsert] = await database.query(
        "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
        [name, email, phone]
      );
      userId = userInsert.insertId;
    }

    // 4. Now that we definitely have a userId (new or old), save the message
    await database.query(
      "INSERT INTO messages (user_id, message) VALUES (?, ?)",
      [userId, message]
    );

    res.status(200).json({ message: "Done!" });

  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Assigning PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running successfully!\nPORT: ${PORT}`);
});