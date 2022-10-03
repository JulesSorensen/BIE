const moment = require("moment");

const getCurrentDate = (date = false) => {
    return date === false ? moment().utc().add(process.env.TIME_SHIFT, 'h') : moment(date).utc().add(process.env.TIME_SHIFT, 'h');
}

module.exports = { getCurrentDate };