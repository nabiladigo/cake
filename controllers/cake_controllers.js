const express = require('express');
const router= express.Router();
const cake= require('../models/cake_model');


router.get('/', (req, res) => {
    const allCake= cake.find();
    const context= {cake: allCake} 
	res.render('cake/index', context);
});

// this rout is not working
router.get('/new', (req, res)=>{
    res.render("cake/new.ejs")
});

router.post('/', (req,res)=>{
    cake.create(req.body, (error, createdCake)=>{
        if (error) return console.log(error);
        console.log(createdCake)
        res.redirect('/cake')
    });
});



router.get('/:cakeId', (req,res)=>{
    cake.findById(req.params.cakeId, (error, foundCake)=>{
        if (error){
            console.log(error);
            res.status(404).render('404', {error: error})
        }
         const context= {cake: foundCake};
        return res.render('cake/show', context);
    });
});


router.delete('/:cakeId', (req, res) => {
    cake.findByIdAndDelete( req.params.cakeId, (error, deletedCake) => {
        if (error) { 
            console.log(error);
            res.status(404).render('404', {error: error})
        }
            console.log(deletedCake);
        return res.redirect('/cake');
    });
});

router.get('/:cakeId/edit', (req, res)=>{
    cake.findById(req.params.cakeId, (error, updateCake)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
        return res.render('cake/edit', {cake: updateCake});
    });
})
router.put('/:cakeId', (req, res)=>{
    cake.findByIdAndUpdate(req.params.cakeId, req.body, (error, updateCake)=>{
        if(error) {
            console.log(error);
            res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/cake/${updateCake.id}`);
        
    })
})


module.exports = router;
