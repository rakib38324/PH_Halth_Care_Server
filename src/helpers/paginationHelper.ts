export type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
};

export type IOptionsResult = {
  page: number;
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
};


export const calculatePagination = (options: IOptions): IOptionsResult => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;

  const skip: number = (Number(page) - 1) * limit;

  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
