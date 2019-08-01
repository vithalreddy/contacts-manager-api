module.exports = (err, req, res, next) => {
  // console.log(req.path, err);

  if (err) {
    if (err.isBoom) {
      err.status = err.output.statusCode;
    }

    const status = err.status || 400;
    // console.log(err.message);
    res.status(status).json({ message: err.message });
  }
  next();
};
