const express= require('express');
const app =express();
const path= require('path');
require('./config/db.connection');

const controllers = require('./controllers');
const methodOverride = require('method-override');
const PORT= process.env.PORT || 4000;

const session =require("express-session");
const MongoStore= require("connect-mongo");


const navLinks = require('./navLinks');

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
// why we use extended false instead of true
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use('/cake', controllers.Cake);
app.use('/', controllers.User);

// app.use('/review', controllers.Review);
app.use(
    session({
        store:MongoStore.create({ mongoUrl:"mongodb://localhost:27017/cake"}),
        secret:"super secret",
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000*60*24*7*2,
        },
    })
);

app.use((req, res, next)=>{
    res.locals.user =req.session.currentUser;
    next();
});

app.use(navLinks);
app.use(function (req, res, next) {
    res.locals.user = req.session.currentUser;
    next();
  });

app.get('/', (req,res)=>{
    res.render('home');
});
app.get('/about', (req,res)=>{
    res.render('about');
});
app.get('/order', (req, res)=>{
    res.render('order');
});

app.get("/*", (req, res) => {
    const context = { error: req.error };
    return res.status(404).render("404", context);
  });

  app.listen( PORT, ()=>
  console.log(`listening for client requests on port ${PORT}`)
  );