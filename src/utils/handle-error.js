function handleError (res, status, error, message = {}) {
  if (Object.values(message).length !== 0) {
    error = { ...error, ...message };
  }
  res.status(status).send({ ...error, isError: true });
}

module.exports = handleError;