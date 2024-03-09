const crypto = require("crypto");
const { currentTime } = require("../date/date");

const CodeToken = {
  code_token: crypto.randomBytes(3).toString("hex"),
  created_at: currentTime,
};

module.exports = CodeToken;
