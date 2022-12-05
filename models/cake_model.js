const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const cakeSchema= new Schema({
    name:{
        type: String,
        required:true
    },
    categorie:{
        type: String,
        required:true
    },
    image:{
        type: String,
        // required:true
    },
    price:{
        type: Number,
        min: [0, 'you can not add a negative number'],
        required: [true, 'price can not be empty'],
    },
    description: {
        type: String,
    }
})
const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

