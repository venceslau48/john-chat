import React from "react"

const Users = ({ users }) => {
    return <ul className="room__users">{users ? users.map(user => <li key={user.name}>{user.name}</li>) : null}</ul>
}

export default Users
