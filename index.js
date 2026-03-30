import express from "express";
import cors from "cors";
import { vaccinesRouter} from "./routers/vaccinesRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/vaccines", vaccinesRouter);

app.listen(8081, () => {
    console.log("Server running on port 8081");
});