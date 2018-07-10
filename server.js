var express = require('express');
var cors = require('cors');
var app = express();

var puppet = require('./modules/puppet3.js')
var openload = require('./modules/openload1.js')
var bodyParser = require('body-parser');  
app.use(express.static(__dirname+'/public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create todo and send back all todos after creation
app.post('/search',async function(req, res) {

    var MovieName1 = req.body.MovieName;
   
    var MovieAbsUrl  =await puppet.DuckSearch(MovieName1);
    const iop =[];
     for (let g of MovieAbsUrl){
    var t = g.toString().split("->");
    var io={};
    io.name=t[0];io.url=t[1];
    iop.push(io);
 
   }
   console.log(iop); 
    res.send(iop);
    
});

///LInkshare
app.post('/LinkSharenet',async function(req, res) {

    var LinkSharenetUrl = req.body.Link;
    console.log("&&&&&&"+LinkSharenetUrl);
    var MovieLink  = await openload.LinkSharenet(LinkSharenetUrl);
    console.log(MovieLink);
     res.send(MovieLink);

    
});



app.listen(8001);
console.log("app running automatically ");