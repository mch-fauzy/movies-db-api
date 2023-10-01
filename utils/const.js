const SHARED = {
  ERR_NAME: {
    NOT_FOUND: "NotFoundError",
    UNAUTHORIZED: "AuthenticationError",
    BAD_REQUEST: "BadRequestError",
    INTERNAL_ERROR: "InternalServerError",
    CONFLICT_ERROR: "ConflictError",
  },
  ROLE: {
    NON_ADMIN: "non-admin",
    ADMIN: "admin"
  }
};

module.exports = SHARED;