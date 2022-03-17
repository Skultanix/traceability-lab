const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '2487fee72e5a47ee9f197458d653ff5c',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

///Endpoint setup
app.get("/", function (req,res){
    rollbar.info("HTML has served successfully")
    res.sendFile(path.join(__dirname,"index.html"))
})

app.get("/styles", function(req, res){
    res.sendFile(path.join(__dirname,"index.css"))
})

app.get("/script", function (req,res){
    res.sendFile(path.join(__dirname,"controller.js"))
})

const port = process.env.PORT || 3400

app.listen(port, () => {
    console.log(`Port ${port} locked and loaded.`)
})

//functions
const messages = []

app.post(`/api/addMessage`, (req, res) => {
  console.log(req.body)
  rollbar.log('Message added successfully.', {author: "Caleb", type: "manual entry"})
  const {newMessage} = req.body

  messages.push(newMessage)
  res.status(200).send(newMessage)
})


app.delete(`/api/delete/:num`, (req, res) => {
  console.log(req.params)

  if(+req.params.num) {
    messages.splice(req.params.num - 1, 1)
    res.status(200).send(messages)
    rollbar.log('Message was successfully deleted.')
  } else {
    res.status(400).send("A number was not inputed.")
    rollbar.error("User failed to input a post number for deletion")
}
console.log(messages)
})

app.put(`/api/update/:num`, (req, res) => {
  const {updatePost} = req.body
  const updateNum = req.params.num - 1

  messages[updateNum] = updatePost

  res.status(200).send(updatePost)
  rollbar.log("Message updated successfully.")
  console.log(messages)
})

app.use(rollbar.errorHandler())
