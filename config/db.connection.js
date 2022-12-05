const mongoose = require('mongoose');
require('dotenv').config();
// const connectionStr= 'mongo://localhost:27017/cake';


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
	useFindAndModify: false
});


  
mongoose.connection.on('connected', ()=>{
    console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`);
});
mongoose.connection.on('error', (error) => {
    console.log('MongoDB connection error 😥', error);
  });
  
mongoose.connection.on('disconnected', () => 
    console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));