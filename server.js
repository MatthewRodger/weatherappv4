const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"});

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on("error", (error) => console.log(error))
db.once("open", () => console.log("connected to database"))

app.use(express.json())


const usersRouter = require("./routes/users")
app.use("/users", usersRouter)


app.listen(3001, () => console.log("server started"))


