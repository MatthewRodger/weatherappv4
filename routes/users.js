const express = require("express");
const router = express.Router()
const { addUser, getUsers, getUser, deleteUser } = require("../controllers/userController")


router
    .route("/")
    .get(getUsers)
    .post(addUser);

router 
    .route("/:id")
    .get(getUser)
    .delete(deleteUser);
module.exports = router