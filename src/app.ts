import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "PH Health care server is running...",
  });
});

app.use("/api/v1/user", UserRoutes);

export default app;
