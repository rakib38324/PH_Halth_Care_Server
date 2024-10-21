import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../../Shared/prisma";


const createAdminIntoDB = async (data: any) => {
  console.log(data);

  const hastedPassword: string = await bcrypt.hash(data?.password, 12);
  // console.log(hastedPassword)
  const userData = {
    email: data.admin.email,
    password: hastedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transacionClient) => {
    await transacionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transacionClient.admin.create({
      data: data?.admin,
    });

    return createdAdminData;
  });

  return result;
};

export const userServices = {
  createAdminIntoDB,
};
