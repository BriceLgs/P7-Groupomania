import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(express.json({limit: "50mb", extended: true}));
app.use(express.urlencoded({limit: "50mb", extended: true}));
app.use(cors());

app.use("/users", userRouter);
app.use("/post", postRouter);

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
     app.listen(port, () => 
        console.log(`Server running on port ${port}`));
})
.catch((error) => console.log(`${error} did not connect`));