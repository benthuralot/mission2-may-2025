import express from "express";
import apiRoutes from "./apiRoutes.js";

const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

// Export app without calling listen()
export default app;
