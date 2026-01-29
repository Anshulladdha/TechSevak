const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error.middleware");
dotenv.config();

const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 TechSevak Backend Running");
});

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/service", require("./routes/service.routes"));
app.use("/api/engineer", require("./routes/engineer.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
app.use("/api/review", require("./routes/review.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));
app.use("/api/payment", require("./routes/payment.routes"));
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
