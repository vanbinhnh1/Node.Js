var Todos=require("../model/todoModel");

var bodyParser=require("body-parser")

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports=function(app){
/*    
    app.get("/api/user/:id",function(req,res){
        //get data from database
        var result={
            ho:"Hoa",
            ten: "mai"
        };
        res.json(result);
    })
    */
    app.post("/api/user",jsonParser ,function(req,res){
        // create new and save to the databse
    });
    app.put("/api/user",jsonParser ,function(req,res){
        // updata user and save to the databse
    });
    app.delete("/api/user/:id",jsonParser ,function(req,res){
        // delete user from databse
    });
}
