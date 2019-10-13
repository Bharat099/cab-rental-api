const mongoose = require('mongoose');

const buyerschema=mongoose.Schema({
    buyer_name:String,
    issue_date:String,
    return_date:String
});
mongoose.exports=mongoose.model('buyers',buyerschema);


