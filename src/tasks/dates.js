const moment = require("moment");

const getCurrentDate = (date = false, format = false) => {
    return date === false ? moment().utc().add(process.env.TIME_SHIFT, 'h') : format === false ? moment(date).utc().add(process.env.TIME_SHIFT, 'h') : moment(date, format).utc().add(process.env.TIME_SHIFT, 'h');
}

module.exports = { getCurrentDate };