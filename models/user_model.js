const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const cakeSchema= new Schema({
    
})
const Cake = mongoose.model('Cake', cakeSchema);
module.exports = Cake;

