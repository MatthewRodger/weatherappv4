const express = require("express");
const router = express.Router()
const User = require("../models/userModel")


//get all
router.get("/", async (req, res) =>{
    try{
        const usersdata = await User.find({})
        return res.status(200).json({
            success:true,
            data: usersdata
        });
    } catch(err){
        res.status(500).json({message: err.message})
    }
})

//create one
router.post("/", async (req, res) =>{
     const user =  new User({
        username: req.body.username,
        locationPref: req.body.locationPref,
        dob: req.body.dob
    })

    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

module.exports = router