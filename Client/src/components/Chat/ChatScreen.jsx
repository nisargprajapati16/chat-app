import { useCallback, useContext, useEffect } from "react";
import socket from "../../utils/socket";
import moment from 'moment'
import ChatContext, { chatActions } from "../../context/chat";
import { ToastContainer, toast } from 'react-toastify';


const ChatScreen = () => {
    const { messages, currentMessage, updateValue, username, room } = useContext(ChatContext);

    const addMessage = useCallback(msg => updateValue(chatActions.SET_MESSAGES, [...messages, msg]), [messages, updateValue]);

    useEffect(() => {
        socket.on("receive_message", data => {
            addMessage(data)
        });
    }, [addMessage]);

    useEffect(() => {
        var objDiv = document.querySelector(".message-container");
        objDiv.scrollTop = objDiv.scrollHeight;
    }, [messages])

    const sendMessage = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!room) {
            toast.error("Enter valid room id and try again !!");
            updateValue(chatActions.SET_IS_JOINED, false);
        }
        if (currentMessage) {
            const msgObj = {
                room,
                author: username,
                message: currentMessage,
                time: moment().format("HH:mm")
            }
            socket.emit("send_message", msgObj);
            addMessage(msgObj);
            updateValue(chatActions.SET_CURRENT_MESSAGE, "");
        } else {
            toast.error("Please type a message before sending");
        }
    }

    return (
        <div className="chat-screen-wrapper">
            <h1>Start sharing your thoughts</h1>
            <div className="message-container">
                {messages.map(msg => (
                    <div className={`message-body ${username === msg.author && "sent-message"}`}>
                        <p>{msg.message}</p>
                        <div className="message-meta">
                            <div className="author">{msg.author || 'Unknown Sender'}</div>
                            <div className="time">{msg.time}</div>
                        </div>
                    </div>
                ))}
            </div>

            <form className="send-message-wrapper">
                <input type="text" placeholder="Type a message" value={currentMessage} onChange={(e) => updateValue(chatActions.SET_CURRENT_MESSAGE, e.target.value)} />
                <button type="submit" disabled={!currentMessage} onClick={sendMessage}>&#9658;</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ChatScreen;
