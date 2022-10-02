const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/CRUD", (error)=>{
    error ? console.log(error) : console.log("Successfully connected to DB")
})

// const Employee = require("./employee")