const { getData } = require("../firebase/firebase")

const getDetails = async (date) => {
    return await getData("edt", date)
}

module.exports = { getDetails }