const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restorantsList = new Schema({
    name: {
       type: String,
    },
    rate: {
        type: Number,
    },
    map_address: {
        type: String,
    },
    address: {
        type: String,
    },
    center: {
        type: Array
    }
}, {timestamps: true});



const RestorantsList = mongoose.model("Lists", restorantsList)

module.exports = RestorantsList;