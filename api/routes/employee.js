const router = require("express").Router();
const Employee = require("../model/employee")


router.get("/", async (req, res, next) => {
    try {
        const data = await Employee.find()
        res.json(data)
    } catch (error) {
        res.send(error)
    }
});


router.get("/:id", async (req, res, next) => {
    try {
        const data = await Employee.findById({_id:req.params.id})
        res.json(data)
    } catch (error) {
        res.send(error)
    }
});

router.post("/", async (req, res, next) => {
    const employee = new Employee({
        ...req.body
    })

    try{
        const data =  await employee.save() 
        res.json(data)
    }catch(err){
        res.send(err)
    }
});

router.put("/:id", async (req, res, next) => {
    
    // res.json(req.body);
    let update = {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        photo: req.body.photo
    }

    try{
        let data = await Employee.findOneAndUpdate({_id: req.params.id}, {update});
        res.json(data)
    }catch(err){
        res.send(err)
    }
});


router.delete("/:id", async (req, res, next) => {
    try{
        let data = await Employee.findByIdAndDelete({_id: req.params.id});
        res.json(data)
    }catch(err){
        res.send(err)
    }
});


module.exports = router;