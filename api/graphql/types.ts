export type GraphQLResponse<T> = {
  errors?: { message: string }[];
  data?: T;
};
