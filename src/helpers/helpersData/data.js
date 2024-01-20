const currentTime = new Date();

const validTime = currentTime.setHours(currentTime.getHours() - 1);

module.exports = { currentTime, validTime };
