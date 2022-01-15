class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }

  static Forbidden() {
    return new ApiError(403, 'No access, check out bearer access token.');
  }

  static BadRequest(message) {
    return new ApiError(400, message);
  }
}

export default ApiError;
