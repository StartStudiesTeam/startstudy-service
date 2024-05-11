const errorMiddleware = (func, message, statusCode) => {
  if (func) {
    const error = new Error(message);
    error.statusCode = statusCode;
    throw error;
  }
};

module.exports = errorMiddleware;
