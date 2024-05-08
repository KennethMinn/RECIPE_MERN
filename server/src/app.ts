import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import recipeRouter from "./routes/recipe_routes";
import cors from "cors";

const app = express();

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(8000, () => {
    console.log("running");
  });
});

app.use(cors()); //including an Access-Control-Allow-Origin header
app.use(express.json()); //parse json data from req
app.use(morgan("dev")); //http middleware

app.use("/api/recipes", recipeRouter);
