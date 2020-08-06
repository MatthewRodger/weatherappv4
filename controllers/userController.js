const User = require("../models/userModel")

exports.addUser = async (req, res, next) => {
    const { username, locationPref } = req.body;


    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (err) {
        // CHECK HTTP RESPONSE ERROR CODE 
        if (err.name === "ValidationError") {
            console.log("val error");
            const messages = Object.values(err.errors).map((val) => val.message);
            console.log(messages);
            return res.status(400).json({
                success: false,
                error: messages,
                data: req.body
            })
        } else if (err.name === "MongoError") {
            if (err.code === 11000) {
                return res.status(400).json({
                    success: false,
                    error: "Username in use",
                    data: req.body
                })
            } else {
                return res.status(500).json({
                    success: false,
                    error: err.message,
                    data: req.body
                })
            }

        } else {
            return res.status(500).json({
                success: false,
                error: "server error",
                data: req.body
            })
        }


    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
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

exports.getUser = async (req, res, next) => {
    const { username, locationPref } = req.body;
    try {
        const userdata = await User.find({username : { $in : [req.params.id]}});
        return res.status(200).json({
            success: true,
            data: userdata
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "server error"
        })
    }

}


exports.deleteUser = async (req, res, next) => {
    try {
        const userdata = await User.deleteOne({username : { $in : [req.params.id]}});
        return res.status(200).json({
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "server error"
        })
    }

}