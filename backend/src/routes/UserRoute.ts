import express from "express";
import {
  DeleteUser,
  GetAllUsers,
  GetUser,
  SetNewUser,
  UpdateUser,
} from "../controllers/UserController";
import ValidateId from "../middlewares/ValidateId";

const router = express.Router();

router.get("/", GetAllUsers);
router.post("/", SetNewUser);
router.route("/:id").get(GetUser).patch(UpdateUser).delete(DeleteUser);

router.param("id", ValidateId);

export default router;
