const router = require("express").Router();
const Employee = require("../model/employee")
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", async (req, res, next) => {
    try {
        const data = await Employee.find()
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = await Employee.findById({_id:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        res.send(error)
    }
});

router.post("/", upload.single('photo'), async (req, res, next) => {
    try{
        const employee = new Employee({
            ...req.body,
            photo: req?.file?.path
        })
        const data =  await employee.save()
        res.status(201).json(data)
    }catch(err){
        res.send(err)
    }
});

router.put("/:id", upload.single('photo'), async (req, res, next) => {
    try{
        let update = {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            dateOfBirth: req.body.dateOfBirth,
            address: req.body.address,
            photo: req?.file?.path
        }
    
        let data = await Employee.findOneAndUpdate({_id: req.params.id}, {...update},{
            new: true,
            rawResult: true
          });

        if(data?.ok == 1){
            res.status(200).json({
                success: true,
                message: "Employee updated successfully"
            })
        } else{
            res.status(400).json({
                success: false,
                message: "Something went wrong"
            })
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
});


router.delete("/:id", async (req, res, next) => {
    try{
        let data = await Employee.findByIdAndDelete({_id: req.params.id}, {
            rawResult: true
        });
        if(data?.value == null){
            res.status(404).json({
                success: false,
                message: "Employee not exist"
            })
        } else{
            res.status(200).json({
                success: true,
                message: "Employee deleted successfully"
            })
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
});

module.exports = router;