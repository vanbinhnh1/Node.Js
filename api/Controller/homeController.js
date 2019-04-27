var Todos=require("../model/todoModel")

var bodyParser=require("body-parser")

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports=function(app){

    app.get("/",function(req,res){
        res.render("user");
    }) 
    //middleware body-parser
    app.post("/login",urlencodedParser,function(req,res){
        //res.send("Welcom,"+req.body.username);
        //console.log(req.body.username);
        //console.log(req.body.password);

        if(req.body.username=="VanNguyen"&&req.body.password=="smilelacuoi"){
            //res.render("index"); 
            res.render("pzem");               
            console.log(req.body.username);
            console.log(req.body.password);
        }
        else{
            res.send("ERROR- Bạn nhập sai username hoặc password")
        }
        


    })
    app.post("/loginjson",jsonParser ,function(req,res){
        res.send("ok");
        console.log(req.body.firstName);
        console.log(req.body.lastName);
    })
}