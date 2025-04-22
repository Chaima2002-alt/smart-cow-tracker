require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware CORS pour Expo Go
app.use(
  cors({
    origin: [
      "http://localhost:1024",
      "exp://192.168.1.11:8081",
      /\.my-app\.exp\.direct$/,
    ],
    credentials: true,
  })
);

app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(
    process.env.DATABASE.replace("<db_password>", process.env.DATABASE_PASSWORD)
  )
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("❌ Erreur MongoDB:", err));

// Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/api/test", (req, res) => res.json({ status: "Backend OK" }));

// Démarrer le serveur
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${process.env.PORT}`);
});
