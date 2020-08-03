const User = require("../models/userModel")

exports.addUser = async (req, res, next) => {
    const {username, locationPref} = req.body;

    const user = await User.create(req.body);
    try{
    return res.status(201).json({
        success: true,
        data: user
    })
} catch (err) {
    //add error for if post is not matching userModel
    return res.status(500).json({
        success: false,
        error: "server error"
    })
}
}

exports.getUsers = async (req, res, next) => {
    try {
        const users =  await User.find();
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "server error"
        })
    }
}