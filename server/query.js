//making any endpoint paginated is as simple as adding the paginate middleware

// 0 means no limit (all documents)
const DEFAULT_PAGE_LIMIT = 0;
const DEFAULT_PAGE = 1;

const getPagination = (query) => {
  const page = Math.abs(query.page) || DEFAULT_PAGE;
  const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
