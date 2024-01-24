const currentTime = new Date();

const expireTime = currentTime.setHours(currentTime.getHours() + 1);

const formattedDate = currentTime.toDateString();

module.exports = { currentTime, formattedDate };
