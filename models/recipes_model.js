const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const recipeSchema= new Schema({
    name:{
        type: String, 
        required: true
    },
    image:{
        type: String,
        // required: true
    },
    direction:{
        type: String,
        // required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    cooking:{
        type:Number,
        // required:true
    },
    prep:{
        type:Number,
        // required:true
    }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports= Recipe;