const {isValidObjectId} = require("mongoose")

function validateObjectId(id){
    const isValid = isValidObjectId(id)
    return isValid;
}

module.exports = validateObjectId;