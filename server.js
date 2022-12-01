const express= require('express');
const app =express();
const path= require('path');

const PORT= 4000;

const cake= require('./models/cake_model.js');

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname,'public')))


app.get('/', (req,res)=>{
    res.send("<h1>Hello World!<h1>")
})
app.get('/cake/', (req, res) => {
    const allCake= cake.find();
    const context= {cake: allCake} 
	res.render('cake/index', context);
});

app.get('/cake/:cakeId', (req,res)=>{
    cake.findById(req.params.cakeId, (error, foundItem)=>{
        if (error)
        return console.log(error);

        return res.send(foundItem);
    });
});



app.listen(PORT, ()=>{
    console.log(`listening for client requests on port ${PORT}`)
})