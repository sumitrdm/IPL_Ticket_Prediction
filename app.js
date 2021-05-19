const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const alert = require('alert');

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect('mongodb+srv://admin-sumit:sumit123@cluster0.bqmx3.mongodb.net/iplData', {useNewUrlParser: true,useUnifiedTopology:true});

const dataSchema = new mongoose.Schema({
name:String,
score:Number,
});

const Data = mongoose.model("Data",dataSchema);

const item1 = new Data({
  name:"RCB",
  score:77.75
});

const item2 = new Data({
  name:"KKR",
  score:69.5
});

const item3 = new Data({
  name:"CSK",
  score:75.5
});

const item4 = new Data({
  name:"RR",
  score:68.5
});

const item5 = new Data({
  name:"DC",
  score:76.5
});

const item6 = new Data({
  name:"PKBS",
  score:72.5
});

const item7 = new Data({
  name:"SRH",
  score:69.75
});

const item8 = new Data({
  name:"MI",
  score:75
});

const defaultTeams = [item1,item2,item3,item4,item5,item6,item7,item8]

app.get("/",function(req,res)
{
  Data.find({},function(err,foundItems){
    if(foundItems.length === 0)
    {
      Data.insertMany(defaultTeams,function(err)
      {
        if(err)
        {
          console.log(err);
        }
        else
        {
          // console.log("successfully data entered into database");
        }
      });
    }
  });
res.render("home");


});



app.post("/",function(req,res)
{
const re1 = req.body.team1;
const re2 = req.body.team2;


Data.findOne({name:re1},function(err,result1)
{
  Data.findOne({name:re2},function(err,result2)
  {
    //
    // console.log(result1.score);
    // console.log(result2.score);
    if(re1===re2)
    {

      res.render("same",{re1:re1,re2:re2});


    }
    else
    {
    const average = (result1.score + result2.score)/2;
      // res.render("new",{data:result1.score,datanew:result2.score});
      res.render("new",{data:average});
    }
  });


});
 });


 const port = process.env.PORT;
 if (port == null || port == "") {
   port = 3000;
 }
 app.listen(port);
