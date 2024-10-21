import { Request, Response } from "express";
import { adminServices } from "./admin.service";
import { pick } from "../../../Shared/pick";
import { adminFilterableFields } from "./admin.constant";



const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy' , 'sortOrder']);
    const result = await adminServices.getAllAdminFromDB(filters, options);
    res.status(200).json({
      success: true,
      message: "Admin data fetched.",
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

export const adminControllers = {
  getAllAdmin,
};
