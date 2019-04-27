var express=require("express")
var mongoose=require("mongoose")
var mqtt=require("mqtt")
var bodyParser=require("body-parser")
var morgan=require("morgan")




//var server = require("http").createServer(app);
//var io = require("socket.io").listen(server);
//var fs = require("fs");
//server.listen(process.env.PORT||4000) 
//console.log("server running")




var config = require("./config/mongoose/in")
var apiController=require("./api/Controller/apiController")
var homeController=require("./api/Controller/homeController")

var mqtt=require("./api/mqtt")

var app=express()
var port=process.env.PORT||3000

mongoose.connect(config.getDbConnectionString())

app.use("/assets",express.static(__dirname + "/public"));  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"))

app.set("view engine", "ejs");    // template EJS
// My midware
app.use("/",function(req,res,next){
    console.log("Req URL:" , req.url);
    req.requestTime=new Date();

    next();
})
    //db info
console.log(config.getDbConnectionString());

apiController(app);
homeController(app);
mqtt(app);
 
app.get("/",function(req,res){
    res.render("user");
})
app.listen(port,function(){
    console.log("   server dang chay o cong: localhost:"+ port);
}
 )  
        /*
        var Person=mongoose.model("Person",personSchema);
        var hoa=Person({
            first:"Hoa",
            last:"Mai",
            address:"Nghia Hanh"
        })

        hoa.save(function(err){
            if(err) throw err;
            console.log(" Hoa is created")
        })
        */  

// checking temp laptop