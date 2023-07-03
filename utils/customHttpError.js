class CustomHttpError extends Error {
  constructor(errorCode, message = "") {
    super();
    this.status = errorCode;
    this.message = message;
  }
}

module.exports = CustomHttpError;
