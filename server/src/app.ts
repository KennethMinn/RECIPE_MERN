import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import morgan from "morgan";
import recipeRouter from "./routes/recipe_routes";

const app = express();

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(8000, () => {
    console.log("running");
  });
});

app.use(express.json()); //parse json data from req

app.use(morgan("dev")); //http middleware

app.use("/api/recipes", recipeRouter);
