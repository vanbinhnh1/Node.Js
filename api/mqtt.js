var mqtt=require("mqtt")
var bodyParser=require("body-parser")

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports=function(app){
    var client = mqtt.connect("mqtt://m14.cloudmqtt.com", {
        username: "oivukdsj",
        password: "cWXO3ZZ1L3-v",
        port: 16099,
        clientId: "WebUI"
    })

    client.on("connect", function()  {           
        client.subscribe("Status")
        client.subscribe("led1")
        client.subscribe("room/vol")
        client.subscribe("lroom/cur")


        console.log("connected!")
    })
    client.on("error", function(e) {
        console.log(e)
    })
    client.on("close", function(e)  {
        client.reconnect()
    })
 /*   client.on("message", function(topic, message) {
        switch(topic) {      
            case "led1":
            {
                if(message==0) 
                    $(document).ready(function(){               
                        $("#div1").load(on())
                    })
                
                if(message==1)  
                    $(document).ready(function(){
                        $("#div1").load(off())
                    })
            }
        }
    } )
  */  
/*    client.on("message", function(topic, message) {
        switch(topic) {      
            case "Status": updateStatus(message); break;
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
}
