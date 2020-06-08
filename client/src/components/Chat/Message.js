import React from "react"

const Message = ({ message: { text, user }, name, createdAt }) => {
    let isSentByCurrentUser = false

    const trimmedName = name.trim().toLowerCase()

    if (user === trimmedName) {
        isSentByCurrentUser = true
    }

    return isSentByCurrentUser ? (
        <div className="message">
            <p>
                <span className="message__name">{trimmedName}</span>
                <span className="message__date">{createdAt}</span>
            </p>
            <p>{text}</p>
        </div>
    ) : (
        <div className="message">
            <p>
                <span className="message__name">{user}</span>
                <span className="message__date">{createdAt}</span>
            </p>
            <p>{text}</p>
        </div>
    )
}

export default Message
