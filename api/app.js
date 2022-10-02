const express = require('express')
const app = express()
const cors = require("cors")
require('dotenv').config()

const connection = require("./model")


app.use('/uploads', express.static('uploads'));

// MeadleWares
app.use(cors());
app.use(express.json());


// Router MedeleWares
app.use("/api/employee", require("./routes/employee"));


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
