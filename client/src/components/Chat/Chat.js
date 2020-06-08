import React, { useState, useEffect } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import moment from "moment"
import Sidebar from "./Sidebar"
import Messages from "./Messages"
import Compose from "./Compose"

let socket

const Chat = ({ location }) => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")
    const [createdAt, setCreatedAt] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState("")
    const ENDPOINT = "https://john-chat.herokuapp.com/"

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setRoom(room)
        setName(name)

        socket.emit("join", { name, room }, error => {
            if (error) {
                alert(error)
                location.href = "/"
            }
        })
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on("message", message => {
            setMessages(messages => [...messages, message])
            setCreatedAt(moment(Date.now()).format("HH:mm"))
        })

        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })
    }, [])

    const sendMessage = e => {
        e.preventDefault()

        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    return (
        <div className="page-chat">
            <div className="chat">
                <Sidebar users={users} room={room} />
                <div className="chat__main">
                    <Messages messages={messages} name={name} createdAt={createdAt} />
                    <Compose message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
    )
}

export default Chat
