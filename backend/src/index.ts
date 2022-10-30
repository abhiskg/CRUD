import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
const UserRoute = require("./routes/User");
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.uri as string;
const client = new MongoClient(uri);

const port = process.env.PORT || 5000;

async function run() {
  try {
    const userCollection = client.db("CRUD").collection("users");
    const data = {
      name: "Abhiii",
      email: "test@gmail.com",
    };
    const result = await userCollection.insertOne(data);
    console.log(result);
  } catch (error) {}
}
// run();

app.get("/", (req, res) => {
  res.send("Success");
});

app.use("/users", UserRoute);

app.listen(port, () => {
  console.log("Server running");
});
