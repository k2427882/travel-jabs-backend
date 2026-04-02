import express from "express";
import cors from "cors";
import { vaccinesRouter } from "./routers/vaccinesRouter.js";
import { clinicsRouter } from "./routers/clinicsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.use("/vaccines", vaccinesRouter);
app.use("/clinics", clinicsRouter);

app.listen(8081, () => {
  console.log("Server running on port 8081");
});
