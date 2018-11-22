var express=require("express")
var mongoose=require("mongoose")
//var cookieParser= require("cookie-parser")
//var mysql=require("mysql")
var mqtt=require("mqtt")

var bodyParser=require("body-parser")
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app=express()
var port=process.env.PORT||3000

mongoose.connect("mongodb://nvb:Smilelacuoi1@ds159263.mlab.com:59263/node-todo")

var apiController=require("./Controller/apiController")
var homeController=require("./Controller/homeController")

//app.use(cookieParser());

app.set("view engine", "ejs");    // template EJS

//mongodb
var Schema=mongoose.Schema// ban do anh xa Js vao CSDL
var personSchema=new Schema({
    first:String,
    last:String,
    address:String
})
   // model tao dc nhieu Person de luu vao CSDL mongodb
var Person=mongoose.model("Person",personSchema);
var hoa=Person({
    first:"Hoa",
    last:"Mai",
    address:"Nghia Hanh"
})
/*
hoa.save(function(err){
    if(err) throw err;
    console.log(" Hoa is created")
})
*/

            var client = mqtt.connect("mqtt://m14.cloudmqtt.com", {
                username: "oivukdsj",
                password: "cWXO3ZZ1L3-v",
                port: 16099,
                clientId: "WebUI"
            })

            client.on("connect", function()  {           
                client.subscribe("Status")
                //client.subscribe("led1")
                console.log("connected!")
            })
            client.on("error", function(e) {
                console.log(e)
            })
            client.on("close", function(e)  {
                client.reconnect()
            })
            client.on("message", function(topic, message) {
                switch(topic) {      
                    case "Status": updateStatus(message); break;
                }
            })

/*
            var updateStatus = function(status)  {
                console.log(status)
                if (status == "on") {
                    client.publish('action', '1')
                    //db2.push("/status", { status: true })
                } else  {
                    client.publish('action', '0')
                    //db2.push("/status", { status: false })
                }
            }
       */

// My midware
app.use("/",function(req,res,next){
    console.log("Req URL:" , req.url);
    req.requestTime=new Date();
 
    
    next();
})
//middleware static
app.use("/assets",express.static(__dirname + "/Public"));   

apiController(app);
homeController(app);

/*
        app.post('/toggleStatus', (req, res) => {
            try{
                let current = getStatus()
                if (current.status) {
                    updateStatus("off")
                } 
                else {
                    updateStatus("on")
                }
                res.json(JSON.stringify(getStatus()))
            } 
            catch(e) {
                console.log(e)
                res.send(e)
            }

        })
*/
        app.post("/on",urlencodedParser,function(req,res){
            client.publish('action', '1')
            res.send("ok");
            
        })
        app.post("/off",urlencodedParser,function(req,res){
            client.publish('action', '0')
           res.send("ok");
        })

 app.get("/",function(req,res){
    res.render("user");
})

app.listen(port,function(){
    console.log("   server dang chay o cong: localhost:"+ port);
}    )  

