module.exports = class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  // Filter the query based on query string parameters, excluding pagination, sort, and fields parameters
  filter() {
    // the fields that should not enter into filtering process
    const excluded = ["page", "limit", "fields", "sort"];
    const unFiltered = { ...this.queryObj };

    // excluded fields gets deleted
    excluded.forEach((q) => delete unFiltered[q]);
    let queryStr = JSON.stringify(unFiltered);

    //    replacing the query as we use in db
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    // returning this to chain the methods for other features like sorting etc
    return this;
  }

  // Sort the query based on the sort parameter in the query string
  sort() {
    let sortBy = "";
    if (this.queryObj.sort) {
      sortBy = this.queryObj.sort.split(",").join(" ");
    }

    if (sortBy) this.query.sort(sortBy);

    return this;
  }

  // Limit the fields of the query based on the fields parameter in the query string
  limit() {
    let limitFields = "";
    if (this.queryObj.fields) {
      limitFields = this.queryObj.fields.split(",").join(" ");
    }
    this.query.select(limitFields);
    return this;
  }

  // Paginate the query based on the page and limit parameters in the query string
  page() {
    let page = this.queryObj.page * 1 || 1;
    let resPerPage = this.queryObj.limit || process.env.RES_PER_PAGE;

    let skip = (page - 1) * resPerPage;

    //  skip is how many documents we are going to skip
    // limit means how may documents we need to send
    this.query.skip(skip).limit(resPerPage);
    return this;
  }
};
