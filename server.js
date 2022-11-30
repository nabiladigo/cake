const express= require('express');
const app =express();
const PORT= 4000;

const cake= ['napolian', 'rasberry', 'wedding']

app.get('/', (req,res)=>{
    res.send("<h1>Hello World!<h1>")
})
app.get('/cake/:cakeIndex', (req, res) => { 
	res.send(cake[req.params.cakeIndex]);
});


app.listen(PORT, ()=>{
    console.log(`listening for client requests on port ${PORT}`)
})