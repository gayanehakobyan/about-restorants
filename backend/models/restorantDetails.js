const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const restorantsDetails = new Schema({
    feedback: {
        type: Array,
    },
    rate: {
        type: Number,
    },
}, {timestamps: true});



const RestorantsDetails = mongoose.model("Details", restorantsDetails)

module.exports = RestorantsDetails;