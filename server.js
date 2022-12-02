const { on } = require('events');
const express= require('express');
const app =express();
const path= require('path');

const PORT= 4000;

const cake= require('./models/cake_model.js');

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname,'public')))


app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/cake/', (req, res) => {
    const allCake= cake.find();
    const context= {cake: allCake} 
	res.render('cake/index', context);
});

app.get('/cake/:cakeId', (req,res)=>{
    cake.findById(req.params.cakeId, (error, foundCake)=>{
        if (error)
        return console.log(error);
         const context= {cake: foundCake};
        return res.render('cake/show', context);
    });
});

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
  });

app.listen(PORT, ()=>{
    console.log(`listening for client requests on port ${PORT}`)
})