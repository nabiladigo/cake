const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const recipesSchema= new Schema({
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
        required: true
    },
    ingredients:{
        type: String,
        required: true
    },
    cookingTime:{
        type:Number,
        required:true
    },
    prepTime:{
        type:Number,
        required:true
    }
});

const Recipe = mongoose.model('Recipe', recipesSchema);

module.exports= Recipe;