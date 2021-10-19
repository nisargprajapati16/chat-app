import { useContext } from "react";
import ChatContext, { chatActions } from "../../context/chat";
import socket from "../../utils/socket";

const JoinRoom = () => {
    const { username, room, updateValue } = useContext(ChatContext);

    const joinRoom = () => {
        if(username && room) {
            socket.emit("join_room", room);
            updateValue(chatActions.SET_IS_JOINED, true);
        }
    };

    return (
        <div className="join-room-wrapper">
            <h1>Get started with group chat !!</h1>
            <input type="text" placeholder="Enter Name" onChange={(e) => updateValue(chatActions.SET_USERNAME, e.target.value)} />
            <input type="text" placeholder="Room Id" onChange={(e) => updateValue(chatActions.SET_ROOM, e.target.value)} />
            <button onClick={joinRoom}>Join A Room</button>
        </div>
    );
};

export default JoinRoom;
