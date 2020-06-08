import React from "react"
import ScrollToBottom from "react-scroll-to-bottom"
import Message from "./Message"

const Messages = ({ messages, name, createdAt }) => {
    return (
        <ScrollToBottom className="chat__messages">
            {messages.map((message, i) => (
                <div key={i}>
                    <Message message={message} name={name} createdAt={createdAt} />
                </div>
            ))}
        </ScrollToBottom>
    )
}

export default Messages
