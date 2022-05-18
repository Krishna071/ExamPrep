const express = require('express')
const app=express();
require('./db/mongoose.js')
const path=require('path')
const port = 8000
const credential = require('./Routers/credential')
const metaData = require('./Routers/metaData')
const document = require('./Routers/documents')
const bodyParser=require('body-parser')
const passport=require('passport')
const session = require('express-session')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: process.env.SECRET ,
  resave: false,
  saveUninitialized: false
}))


app.use('/credential',credential);
app.use('/metaData',metaData);
app.use('/document',document);

app.use(express)

// __dirname=path.resolve()

  
// if(process.env.NODE_ENV == "production")
// {
//     app.use(express.static(path.join(__dirname,'/client/build')))

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//     })
// }




app.listen(port,()=>{
    console.log("Server is up on port ",port);
})