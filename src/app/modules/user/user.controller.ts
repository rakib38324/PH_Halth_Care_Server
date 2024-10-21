import { Request, Response } from "express";
import { userServices } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  // console.log("User Controller", req.body)
  try {
    const result = await userServices.createAdminIntoDB(req.body);
    res.status(200).json({
      success: true,
      message: "Admin Cerated Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong.",
      error: error,
    });
  }
};

export const userController = {
  createAdmin,
};
