const info = (...params) => {
  // eslint-disable-next-line
  console.log(...params);
};

const error = (...params) => {
  // eslint-disable-next-line
  console.error(...params);
};

module.exports = {
  info,
  error,
};
