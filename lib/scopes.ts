
export const pagination = (limit: number) => (page: number) => ({
  offset: limit * (page < 1 ? 0 : page - 1),
  limit
});