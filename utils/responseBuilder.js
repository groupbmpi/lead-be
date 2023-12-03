
const successResponse = (code, message, data) => {
  return {
    code: code,
    status: "success",
    message: message,
    data: data,
  };
};

const errorResponse = (code, message) => {
  return {
    code: code,
    status: "error",
    message: message,
  };
};

module.exports = {
  successResponse,
  errorResponse,
};
