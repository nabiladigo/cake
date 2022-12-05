const express = require('express');
const router= express.Router();
const db= require('../models');


router.get('/', (req, res, next) => {
    db.Cake.find({},(error, allCake)=>{
        if (error) {
            return console.log(error);
        }
        const context= {
            cake: allCake,
        };
        res.render('cake/index', context);
    })
});

// this rout is not working
router.get('/new', (req, res)=>{
    res.render("cake/new.ejs")
});

router.post('/', (req,res)=>{
    db.Cake.create(req.body, (error, createdCake)=>{
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



router.get('/:cakeId', (req,res, next)=>{
    db.Cake.findById(req.params.cakeId, (error, foundCake)=>{
        if (error){
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404', {error: error})
        }
         const context= {cake: foundCake};
        return res.render('cake/show', context);
    });
});


router.delete('/:cakeId', (req, res) => {
    db.Cake.findByIdAndDelete( req.params.cakeId, (error, deletedCake) => {
        if (error) { 
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404', {error: error})
        }
            console.log(deletedCake);
        return res.redirect('/cake');
    });
});

router.get('/:cakeId/edit', (req, res)=>{
    db.Cake.findById(req.params.cakeId, (error, updateCake)=>{
        if(error) {
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404.ejs', {error: error});
        }
        const context={cake: updateCake}
        return res.render('cake/edit', context);
    });
})
router.put('/:cakeId', (req, res)=>{
    db.Cake.findByIdAndUpdate(req.params.cakeId,
        {
            $set:req.body
        },
        {
            new:true
        },
         (error, updateCake)=>{
        if(error) {
            console.log(error);
            req.error= error
            return next();
            // res.status(404).render('404.ejs', {error: error});
        }
            return res.redirect(`/cake/${updateCake.id}`);
        
    })
})


module.exports = router;
