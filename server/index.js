import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";

import connectDB from "./mongodb/connect.js";
import propertyRouter from "./routes/property.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);

const startServer = async () => {
  try {
    // connect to the database
    connectDB(process.env.MONGODB_URL);

    // start server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server has started on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
