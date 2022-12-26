const express = require('express');
const router= express.Router();
const {Cake}= require('../models');


router.get('/', async(req, res) => {
    try{
        const cake = await Cake.find()
        const context ={cake}
        return res.render('cake/index', context);
    }
    catch(error){
        res.status(404).render('404', {error: error})

    }
});


router.get('/new', (req, res)=>{
    res.render("cake/new.ejs")
});

router.post('/', (req,res)=>{
    Cake.create(req.body, (error, createdCake)=>{
        if (error) {
            console.log(error)
            req.error= error;
            const context= {
                error,
            };
            return res.render('cake/new', context);
        };

        console.log(createdCake)
        res.redirect('/cake')
    });
});



router.get('/:cakeId', (req,res)=>{
    Cake.findById(req.params.cakeId, (error, foundCake)=>{
        if (error){
            console.log(error);
            res.status(404).render('404', {error: error});
        }
         const context= {cake: foundCake};
        return res.render('cake/show', context);
    });
});


router.delete('/:cakeId', (req, res) => {
    Cake.findByIdAndDelete( req.params.cakeId, (error, deletedCake) => {
        if (error) { 
            console.log(error);
            res.status(404).render('404', {error: error})
        }
            console.log(deletedCake);
        return res.redirect('/cake');
    });
});

router.get('/:cakeId/edit', (req, res)=>{
    Cake.findById(req.params.cakeId, (error, updateCake)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        const context={cake: updateCake}
        return res.render('cake/edit', context);
    });
})
router.put('/:cakeId', (req, res)=>{
    Cake.findByIdAndUpdate(req.params.cakeId,
        {
            $set:req.body
        },
        {
            new:true
        },
         (error, updateCake)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/cake/${updateCake.id}`);
        
    })
});

// router.get('/show', (req,res)=>{
//     res.render('home');
// });


module.exports= router;
