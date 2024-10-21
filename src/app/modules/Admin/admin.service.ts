import { Prisma } from "@prisma/client";
import { adminSearchableFields } from "./admin.constant";
import { calculatePagination } from "../../../helpers/paginationHelper";
import prisma from "../../../Shared/prisma";



const getAllAdminFromDB = async (params: any, options: any) => {
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andContidions: Prisma.AdminWhereInput[] = [];

  if (params.searchTerm) {
    andContidions.push({
      OR: adminSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andContidions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereConditons: Prisma.AdminWhereInput = { AND: andContidions };

  const result = await prisma.admin.findMany({
    where: whereConditons,
    skip: skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  return result;
};

export const adminServices = {
  getAllAdminFromDB,
};
