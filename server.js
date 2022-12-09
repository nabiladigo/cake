const express= require('express');
const app =express();
require('./config/db.connection');
const controllers = require('./controllers');
const methodOverride = require('method-override');
const PORT= process.env.PORT || 4000;

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/cake', controllers.Cake);
app.use('/recipes', controllers.Recipe);

// app.use('/user', controllers.User);
// app.use('/review', controllers.Review);

app.get('/', (req,res)=>{
    res.render('home')})
app.get('/about', (req,res)=>{
    res.render('about')})

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
  });

app.listen(PORT, ()=>{
    console.log(`listening for client requests on port ${PORT}`)
})