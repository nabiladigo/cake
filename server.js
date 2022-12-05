const express= require('express');
const app =express();
// const path= require('path'); think if I need ithere
const cakeCtrls= require('./controllers/cake_controllers');
const recipesCtrls= require('./controllers/recipes_controllers');
const methodOverride = require('method-override');

const PORT= 4000;



app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
// app.set('views', path.join(__dirname, '/views'));this is related to the path it allow u to access from any folder
// app.use(express.static(path.join(__dirname,'public'))); same as 15
app.use('/cake', cakeCtrls);
app.use('/recipes', recipesCtrls);


// not sure why I used this 
// app.use((req,res,next)=>{
//     console.log('I run for all routes');
//     next();
// })

app.get('/', (req,res)=>{
    res.render('home')
})
app.get('/about', (req,res)=>{
    res.render('about')
});

// app.get('/new', (req, res)=>{
//     res.render("cake/new.ejs")
// });


app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
  });

app.listen(PORT, ()=>{
    console.log(`listening for client requests on port ${PORT}`)
})