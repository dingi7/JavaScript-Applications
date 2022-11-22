const baseUrl = `http://localhost:3030/jsonstore/messenger`
const sendBtn = document.getElementById("submit")
const refreshBtn = document.getElementById("refresh")
const author = document.getElementsByName("author")[0]
const content = document.getElementsByName("content")[0]
const textArea = document.getElementById('messages')

function attachEvents() {
    sendBtn.addEventListener("click", sendMessage)
    refreshBtn.addEventListener("click", refresh)
}

async function sendMessage(){
    const postData = {
        author: author.value,
        content: content.value
    }
    let response = await fetch(baseUrl,{
        method: "post",
        body: JSON.stringify(postData)
    })
}

async function refresh(){
    textArea.textContent = ""
    const response = await fetch(baseUrl)
    const data = await response.json()
    let content = []
    for(let [key, value] of Object.entries(data)){
        content.push(`${value.author}: ${value.content}`)
    }
    textArea.textContent = content.join("\n")
}

attachEvents();