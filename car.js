const mongoose = require('mongoose');

const carschema=mongoose.Schema({
    car_number:String,
    model:String,
    seating_capacity:String,
    rent_per_day:String,
    book:Boolean,
    buyer_name:String,
    issue_date:String,
    return_date:String
});
mongoose.exports=mongoose.model('cars',carschema);


