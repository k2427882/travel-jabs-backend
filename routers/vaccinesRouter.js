import express from "express";
import {
    getVaccines,
    addVaccine,
    getVaccineById,
    updateVaccine,
    deleteVaccine 
}   from "../controllers/vaccinesController.js";

export const vaccinesRouter = express.Router();

vaccinesRouter.get("/", getVaccines);
vaccinesRouter.post("/", addVaccine);

vaccinesRouter.get("/:id", getVaccineById);
vaccinesRouter.put("/:id", updateVaccine);
vaccinesRouter.delete("/:id", deleteVaccine);