import { useContext, useEffect } from "react";
import ChatContext from "../../context/chat";
import ChatScreen from "./ChatScreen";
import JoinRoom from "./JoinRoom";

const Index = () => {
    const { isJoined } = useContext(ChatContext);

    useEffect(() => {
      console.log("isJoined", isJoined)
    }, [isJoined])


    return (
        <div className="chat-wrapper">
            {
              isJoined ? (
                <ChatScreen />
              ) : (
                <JoinRoom />
              )
            }
        </div>
    );
};

export default Index;
