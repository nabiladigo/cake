const express= require('express');
const router= express.Router();
const db= require('../models');

router.get('/', (req, res, next) => {
    db.Recipe.find({},(error, allRecipes)=>{
        if (error) {
            return console.log(error);
        }
        const context= {
            recipes: allRecipes,
        };
        res.render('recipes/index', context);
    })
});

// this rout is not working
router.get('/new', (req, res)=>{
    res.render("recipes/new.ejs")
});

router.post('/', (req,res)=>{
    db.Recipe.create(req.body, (error, createdRecipe)=>{
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



router.get('/:recipeId', (req,res, next)=>{
    db.Recipe.findById(req.params.cakeId, (error, foundRecipe)=>{
        if (error){
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404', {error: error})
        }
         const context= {recipe: foundRecipe};
        return res.render('recipes/show', context);
    });
});


router.delete('/:recipeId', (req, res) => {
    db.Recipe.findByIdAndDelete( req.params.recipeId, (error, deletedRecipe) => {
        if (error) { 
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404', {error: error})
        }
            console.log(deletedRecipe);
        return res.redirect('/recipes');
    });
});

router.get('/:recipeId/edit', (req, res)=>{
    db.Recipe.findById(req.params.recipeId, (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404.ejs', {error: error});
        }
        const context={recipe: updateRecipe}
        return res.render('recipes/edit', context);
    });
})

router.put('/:recipeId', (req, res)=>{
    db.Recipe.findByIdAndUpdate(req.params.recipeId,
        {
            $set:req.body
        },
        {
            new:true
        },
         (error, updateRecipe)=>{
        if(error) {
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/cake/${updateRecipe.id}`);
        
    })
})



module.exports= router;