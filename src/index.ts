import express from "express";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoute.js";
import logger from "./logger.js";

const app = express();
const PORT = 3000;

connectDB();

// Middleware
app.use(express.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});

//node dist/index.js
