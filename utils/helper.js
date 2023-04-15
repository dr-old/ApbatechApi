module.exports = {
  response: (response, status, message, data) => {
    const result = {};
    result.status = status || 200;
    result.message = message;
    result.data = data;

    return response.status(result.status).json(result);
  },
  imageUrl: (image) => {
    return !image ? "" : `${process.env.BASEURL}/assets/images/${image}`;
  },
};
