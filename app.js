import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import { connectToMongoDB } from "./configDB/connectToMongoDB.js";

const app = express();
app.use(express.json({ limit: "10mb" }));
dotenv.config();

connectToMongoDB();
app.use("/user", userRouter);
app.use("/contact", contactRouter);
const port = 8080;

app.use(
  cors({
    origin: "*",
  })
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});

app.all("/*", (req, res) => {
  res.json({
    msg: "service is up",
    method: req.method,
    head: req.header("Authorization"),
  });
});