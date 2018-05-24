const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
const Profile = require('./mongo/Profile.js');

function startService(){
  app.use(express.static("."));

  app.get("/", (req,res) => {
    res.redirect('/api');
  });

  app.get("/api", (req,res) => {
    res.sendFile(path.join(__dirname + '/API/index.html'));
  });

  app.get('/getAllProfiles', (req,res) => {
    Profile.find()
      .then(function(doc){
        res.json(doc);
      });
  });

  app.post('/getProfileByID/:id', (req,res) => {
    let _id = req.params.id;

    Profile.find({
      _id
    })
      .then(function(doc){
        if(doc.length>0){
          res.json(doc);
        } else{
          res.json({
            status: "error",
            error: "ID not found"
          })
        }
      });
  });

  app.put("/getProfileByGenderAndAge/:gender/:age", (req,res) => {
    let gender = (req.params.gender).toLowerCase();
    let age = req.params.age;
    Profile.find({
      age,
      gender
    })
      .then(function(doc){
        if(doc.length>0){
          res.json(doc);
        } else{
          res.json({
            status: "error",
            error: "Profile not found according to these params"
          })
        }
      });
  });


  http.createServer(app).listen(process.env.PORT || 3000);
  console.log("listening on localhost:3000");
}

module.exports = {
  startService
}
