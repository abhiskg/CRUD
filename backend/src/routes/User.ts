import express from "express";
const users = require("../../data/users.json") as UserType[];

interface UserType {
  id: string;
  name: string;
  email: string;
}

const router = express.Router();

router.get("/", (req, res) => {
  //   const name = req.query.name as string;
  //   if (req.query.name) {
  //     const filteredUser = users.filter(
  //       (user) => user.name.toLowerCase().indexOf(name) >= 0
  //     );
  //     res.send(filteredUser);
  //   }
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;
  user.id = users.length + 1;
  users.push(user);
  res.send(user);
  console.log(user);
});

module.exports = router;
