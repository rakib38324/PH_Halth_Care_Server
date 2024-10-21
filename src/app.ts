import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";
import { adminRouters } from "./app/modules/Admin/admin.routes";

const app: Application = express();
app.use(cors());

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "PH Health care server is running...",
  });
});

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/admin", adminRouters);

export default app;
