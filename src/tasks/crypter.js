const encrypt = (text) => {
  return new Buffer(text).toString("base64");
};

const decrypt = (hash) => {
  return new Buffer(hash, "base64").toString("utf-8");
};

module.exports = {
  encrypt,
  decrypt,
};