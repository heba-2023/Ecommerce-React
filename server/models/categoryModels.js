const mongoose = require('mongoose')


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Category Required'],
        unique :[true,'Category Must be unique'],
        minlength:[3,'too short Category name'],
        maxlength :[32,'to long Category name']


    }
}
,
{timestamps:true}
)


module.exports = mongoose.model("Category",categorySchema)