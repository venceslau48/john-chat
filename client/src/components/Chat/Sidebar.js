import React from "react"
import Users from "./Users"

const Sidebar = ({ room, users }) => {
    return (
        <div className="chat__sidebar">
            <div className="room">
                <h2 className="room__title">{room}</h2>
                <h3 className="room__users-title">Users list</h3>
                <Users users={users} />
            </div>
        </div>
    )
}

export default Sidebar
