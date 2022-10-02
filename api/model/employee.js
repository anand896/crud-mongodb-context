const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  age: {
    type : String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: String
  },
  address: {
    type: String
  },
  photo: {
    type: String
  }  
});

module.exports = mongoose.model("Employee", EmployeeSchema);
