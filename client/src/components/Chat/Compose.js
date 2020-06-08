import React from "react"

const Compose = ({ setMessage, sendMessage, message }) => {
    return (
        <div className="send-form">
            <form id="message-form" className="send-form__form">
                <input
                    className="send-form__input"
                    type="text"
                    name="message"
                    placeholder="Insert your message"
                    required
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={e => (e.key === "Enter" ? sendMessage(e) : null)}
                    // autocomplete="off"
                />
                <button className="send-form__button btn" onClick={e => sendMessage(e)}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default Compose
