import express from "express";
import { getvaccines, addVaccine} from "../controllers/vaccinesController.js";

export const vaccinesRouter = express.Router();

vaccinesRouter.get("/", getVaccines);
vaccinesRouter.post("/", addVaccine);
