import express from "express";
import {
  getClinics,
  addClinic,
  getClinicById,
  updateClinic,
  deleteClinic
} from "../controllers/clinicsController.js";

export const clinicsRouter = express.Router();

clinicsRouter.get("/", getClinics);
clinicsRouter.post("/", addClinic);
clinicsRouter.get("/:id", getClinicById);
clinicsRouter.put("/:id", updateClinic);
clinicsRouter.delete("/:id", deleteClinic);