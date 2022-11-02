import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

const ValidateId = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: "Product Not found" });
  }
  next();
};

export default ValidateId;
