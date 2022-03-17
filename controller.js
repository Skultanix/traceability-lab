let newElemNum = 1

const messageInput = document.getElementById(`messageBox`)
const addMessageButton = document.getElementById(`postMessage`)
const postArea = document.getElementById("messageArea")

function createMessage() {
    let newMessage = messageInput.value

    let messageBody = {
        newMessage
    }

    axios
    .post("/api/addMessage/", messageBody)
    // .post("http://localhost:3400/api/addMessage/", messageBody)
    .then((res) => {
        let messageText = res.data
        let newPost = document.createElement(`h5`)
        newPost.innerText = `${newElemNum}. ${messageText}`
        newPost.id = `post-message-${newElemNum}`

        document.body.insertBefore(newPost, postArea)
        console.log(res)

        messageInput.value = ''

        newElemNum++
    })
}
addMessageButton.addEventListener(`click`,createMessage)

////
let postNum = document.getElementById(`deleteRequest`)

function deleteMessage() {
    const postNumReq = postNum.value

    axios
    .delete(`/api/delete/${postNumReq}`)
    // .delete(`http://localhost:3400/api/delete/${postNumReq}`)
      .then((res) =>{
            let killedMessage = document.getElementById(`post-message-${postNumReq}`)
            killedMessage.remove()
            alert("Message deleted.")
            postNumReq.value = ''
            
      })
      .catch((err) => {
          console.log(err.response.data)
      })
}

const killBtn = document.getElementById(`deleteBtn`)
killBtn.addEventListener(`click`,deleteMessage)
////
let postCont = document.getElementById(`updateMessageBox`)

function updateMessage() {
    const postNumReq = postNum.value
    let updatePost = postCont.value

    const content = {
        updatePost
    }

    axios
    .put(`/api/update/${postNumReq}`, content)
    // .put(`http://localhost:3400/api/update/${postNumReq}`, content)
    
      .then((res) => {
            let changePost = document.getElementById(`post-message-${postNumReq}`)
            changePost.innerText = `${postNumReq}. ${res.data}`
            postCont.value = ''
      })
}

const updateButton = document.getElementById(`updateBtn`)
updateButton.addEventListener(`click`, updateMessage)