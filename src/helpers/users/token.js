const crypto = require("crypto");
const { currentTime } = require("../helpersData/data");

const codeToken = {
  code_token: crypto.randomBytes(3).toString("hex"),
  created_at: currentTime,
};

module.exports = codeToken;
