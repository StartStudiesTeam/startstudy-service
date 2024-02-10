const dayjs = require("dayjs");

const currentTime = dayjs().toDate();

const afterDate = async (after) => {
  const find = await dayjs().isAfter(dayjs.unix(after));
  return find;
};

module.exports = {
  currentTime,
  afterDate,
};
