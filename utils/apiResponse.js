const apiResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
  };
};

export default apiResponse;
