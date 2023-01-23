const mongoose= require('mongoose');

const aboutSchema= new mongoose.Schema({
    image:{
        type: String,
    },
    about:{
        type:String,
    },
})

const About = mongoose.model('About', aboutSchema);
module.exports = About;