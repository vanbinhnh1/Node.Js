var configValues= require("./config");
module.exports={
    getDbConnectionString:function(){
        return`mongodb://${configValues.username}:${configValues.password}@ds159263.mlab.com:59263/node-todo`
    }
}

