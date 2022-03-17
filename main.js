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
//
const messages = []

app.post(`/api/addMessage`, (req, res) => {
  console.log(req.body)
  const {newMessage} = req.body

  messages.push(newMessage)
  res.status(200).send(newMessage)
})


app.delete(`/api/delete/:num`, (req, res) => {
  console.log(req.params)

  if(+req.params.num) {
    messages.splice(req.params.num - 1, 1)
    res.status(200).send(messages)
  } else {
    res.status(400).send("A number was not inputed.")
}
console.log(messages)
})

app.put(`/api/update/:num`, (req, res) => {
  const {updatePost} = req.body
  const updateNum = req.params.num - 1

  messages[updateNum] = updatePost

  res.status(200).send(updatePost)
  console.log(messages)
})
