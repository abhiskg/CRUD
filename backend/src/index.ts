import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute";
import dbConnect from "./config/dbConnect";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/users", UserRoute);

dbConnect()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
