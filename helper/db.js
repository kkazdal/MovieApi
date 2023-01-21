const mongoose = require("mongoose");

module.exports=()=>{
    mongoose.set('strictQuery', true);

    mongoose.connect("mongodb://localhost/movie");

    mongoose.connection.on("open",()=>{
        console.log("Db Connected");
    });
      
    mongoose.connection.on("error",()=>{
        console.log("Db Error");
    });

    mongoose.Promise = global.Promise;
}