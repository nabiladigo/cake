const express= require('express');
const router= express.Router();
const recipe= require('../models/recipes_model');

router.get('/', (req, res) => {
    const allRecipe= recipe.find();
    const context= {recipe: allRecipe} 
	res.render('recipes/index', context);
});

// this rout is not working
router.get('/new', (req, res)=>{
    res.render("recipes/new.ejs")
});

router.post('/', (req,res)=>{
    recipe.create(req.body, (error, createdRecipe)=>{
        if (error) return console.log(error);
        console.log(createdRecipe)
        res.redirect('/recipes')
    });
});



router.get('/:recipeId', (req,res)=>{
    recipe.findById(req.params.recipeId, (error, foundRecipe)=>{
        if (error){
            console.log(error);
            res.status(404).render('404', {error: error})
        }
         const context= {recipe: foundRecipe};
        return res.render('recipes/show', context);
    });
});


router.delete('/:recipeId', (req, res) => {
    recipe.findByIdAndDelete( req.params.recipeId, (error, deletedRecipe) => {
        if (error) { 
            console.log(error);
            res.status(404).render('404', {error: error})
        }
            console.log(deletedRecipe);
        return res.redirect('/recipes');
    });
});

router.get('/:recipeId/edit', (req, res)=>{
    recipe.findById(req.params.recipeId, (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        return res.render('recipes/edit', {recipe: updateRecipe});
    });
})
router.put('/:recipeId', (req, res)=>{
    recipe.findByIdAndUpdate(req.params.recipeId, req.body, (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/recipes/${updateRecipe.id}`);
        
    })
})
module.exports= router;