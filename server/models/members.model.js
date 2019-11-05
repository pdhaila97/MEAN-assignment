const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usedSchema = new Schema(
    {   
        name: String,
        email: String, 
        address: String,
        phone: String
    }
);

let userModel = mongoose.model('memberModel', usedSchema);

module.exports = userModel;