const express = require('express');
const dotenv = require("dotenv");
const connectDB = require("./service/db");
const AuthRoutes = require("./routes/AuthRoutes")

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//Routes 
app.use("/auth", AuthRoutes);
app.use("auth", AuthRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
