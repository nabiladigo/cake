const mongoose= require('mongoose');
const cakeSchema= new mongoose.Schema({
    name:{type: String,},
    categorie:{type: String},
    image:{type: String},
    price:{
        type: Number,
        min: [0, 'you can not add a negative number']},
    recipe: {
        type: String
    }
})
const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

