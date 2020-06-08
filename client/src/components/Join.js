import React, { useState } from "react"
import { Link } from "react-router-dom"

const Join = () => {
    const [name, setName] = useState("")
    const [room, setRoom] = useState("")

    const join = e => {
        if (!name || !room) {
            e.preventDefault()
        }

        return null
    }

    return (
        <div className="page-login">
            <div className="login">
                <h1 className="login__title">Chat App</h1>
                <form className="login__form">
                    <label className="login__label">Display name</label>
                    <input
                        className="login__input"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Display name"
                        required
                    />
                    <label className="login__label">Room</label>
                    <input
                        className="login__input"
                        type="text"
                        value={room}
                        onChange={e => setRoom(e.target.value)}
                        placeholder="Room"
                        required
                    />
                    <Link to={`/chat?name=${name}&room=${room}`} onClick={join}>
                        <button className="login__button btn">Join</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Join
