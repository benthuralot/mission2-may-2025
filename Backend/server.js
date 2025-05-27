import express from "express";
import apiRoutes from "./apiRoutes.js";
const app = express();
app.use(express.json());
app.use("/api", apiRoutes);

// Start the Express server
// PORT
const PORT = process.env.PORT || 4000;
app
  .listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
  })
  .on('error', (error) => {
    console.log('Server Error - !', error);
  });
 
 
// Export app without calling listen()
export default app;
