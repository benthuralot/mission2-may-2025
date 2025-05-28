import express from "express";
import apiRoutes from "./apiRoutes.js";
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

// Start the Express server
const PORT = process.env.PORT || 4000;

 
  if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
 
// Export app without calling listen()
export default app;
