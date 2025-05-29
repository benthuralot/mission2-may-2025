import express from "express";
import cors from "cors"; // ✅ import CORS
import apiRoutes from "./apiRoutes.js";

const app = express();

// ✅ enable CORS for all origins (for development)
app.use(cors());

// Parse JSON
app.use(express.json());

// API routes
app.use("/api", apiRoutes);

// Start server
const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
