const errorMiddleware = (err, _req, res, _next) => {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;

    return res.status(statusCode).json({ ...payload });
  }

  return res.status(500).json({ message: err.message });
};

module.exports = errorMiddleware;
