const express=require('express');
const connectDB=require('../backend/config/db.connection');
const dotenv=require('dotenv');
const app = express();

//route
const userRoute=require('./apps/routes/userRoutes');
const chatRoute=require('./apps/routes/chatRoutes');
const messagesRoute=require('./apps/routes/messageRoutes')

//handling error
const { notFound, errorHandler } = require('./apps/middleware/errorhandler');


dotenv.config();
connectDB();

app.use(express.json());

//setup cors 
// app.use((req,res, next)=>{
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Authorization,Accept')
//     res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
//     next();
// })



//route
app.use('/api/users',userRoute);
app.use('/api/chat',chatRoute);
app.use('/api/messages',messagesRoute);

//error handling middleware
app.use(notFound);
app.use(errorHandler);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`listening on http://localhost ${PORT}`)
});