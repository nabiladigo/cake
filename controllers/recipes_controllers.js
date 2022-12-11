const express= require('express');
const router= express.Router();
const {Recipe}= require('../models');

router.get('/', async(req, res) => {
    try{
        const recipe = await Recipe.find()
        const context = {recipe}
        return  res.render('recipes/index', context);
    }
    catch(error){
        res.status(404).render('404', {error: error})
    }
});


router.get('/new', (req, res)=>{
    res.render("recipes/new.ejs")
});

router.post('/', (req,res)=>{
    Recipe.create(req.body, (error, createdRecipe)=>{
        if (error) {
            console.log(error)
            req.error= error;
            const context= {
                error,
            };
            return res.render('recipes/new', context);
        };

        console.log(createdRecipe)
        res.redirect('/recipes')
    });
});



router.get('/:recipeId', (req,res)=>{
    Recipe.findById(req.params.recipeId, (error, foundRecipe)=>{
        if (error){
            console.log(error);
            res.status(404).render('404', {error: error})
        }
         const context= {recipe: foundRecipe};
        return res.render('recipes/show', context);
    });
});


router.delete('/:recipeId', (req, res) => {
    Recipe.findByIdAndDelete( req.params.recipeId, (error, deletedRecipe) => {
        if (error) { 
            console.log(error);
            res.status(404).render('404', {error: error})
        }
            console.log(deletedRecipe);
        return res.redirect('/recipes');
    });
});

router.get('/:recipeId/edit', (req, res)=>{
    Recipe.findById(req.params.recipeId, (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        const context={recipe: updateRecipe}
        return res.render('recipes/edit', context);
    });
})

router.put('/:recipeId', (req, res)=>{
    Recipe.findByIdAndUpdate(req.params.recipeId,
        {
            $set:req.body
        },
        {
            new:true
        },
         (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/recipes/${updateRecipe.id}`);
        
    })
})



module.exports= router;