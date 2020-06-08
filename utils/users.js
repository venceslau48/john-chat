const users = []

// FUNCTION ADD USER
const addUser = ({ id, name, room }) => {
    // Clean the data
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if (!name || !room) {
        return {
            error: "Name and room are required!"
        }
    }

    // Check for existing user
    const existingUser = users.find(user => {
        return user.room === room && user.name === name
    })

    //Validate name
    if (existingUser) {
        return {
            error: "Name was taken!"
        }
    }

    // Store user
    const user = { id, name, room }
    users.push(user)
    return { user }
}

// FUNCTION REMOVE USER
const removeUser = id => {
    const index = users.findIndex(user => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// FUNCTION GET USER
const getUser = id => {
    return users.find(user => user.id === id)
}

// FUNCTION GET USERS IN ROOM
const getUsersInRoom = room => {
    room = room.trim().toLowerCase()
    return users.filter(user => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}
