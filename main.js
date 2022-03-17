const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", function (req,res){
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/styles", function(req, res){
    res.sendFile(path.join(__dirname,"index.css"))
})

app.get("/", function (req,res){
    res.sendFile(path.join(__dirname,"controller.js"))
})

const port = process.env.PORT || 3400

app.listen(port, () => {
    console.log(`Port ${port} locked and loaded.`)
})