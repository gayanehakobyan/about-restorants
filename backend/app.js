const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const restorantRoutes = require("./routs/restorantRouts")


//conect to mongoDB
const dbURL = "mongodb+srv://Gayane:Gayane93@cluster0.wwuij.mongodb.net/restorants?retryWrites=true&w=majority"
mongoose.connect(dbURL, {useNewUrlParser : true, useUnifiedTopology:true, useFindAndModify: false}).
then((result) => app.listen(3000)).
catch((err) => console.log("db error", err))

// express app
const app = express();


app.use(express.urlencoded({extended: true}))
app.use(express.json());

app.use(morgan("dev"))
app.use(cors())


// It doesn't work correctly
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Header", "Content-Type, Accept");

//   if(req.method === "OPTIONS") 
//   {
//     res.header("Access-Control-Allow-Methods", "PUT, GET, DELETE");
//     return res.status(200).json({});
//   }

//   next();
// })


app.use("/restorants", restorantRoutes);


 
// 404 page
app.use((req, res) => {
  res.redirect("/");
});
