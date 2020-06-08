const path = require("path")
const http = require("http")
const express = require("express")
const socketio = require("socket.io")
const Filter = require("bad-words")
const cors = require("cors")
const { generateMessage } = require("./utils/messages")
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users")

const router = require("./router")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, "client/build")))
app.use(cors())
app.use(router)

io.on("connection", socket => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if (error) return callback(error)

        socket.join(user.room)

        socket.emit("message", generateMessage("Admin", "Welcome!"))
        socket.broadcast.to(user.room).emit("message", generateMessage("Admin", `${user.name} has joined!`))

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on("sendMessage", (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback("Profanity is not allowed!")
        }

        io.to(user.room).emit("message", generateMessage(user.name, message))
        callback()
    })

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit("message", generateMessage("Admin", `${user.name} has left!`))

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

const server = app.listen(process.env.PORT || 3001, function () {
    const port = server.address().port
    console.log("Server running on port: " + port)
})
