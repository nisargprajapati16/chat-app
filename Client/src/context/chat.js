import { createContext, useReducer } from "react";

const initialState = {
    username: "",
    room: "",
    isJoined: false,
    currentMessage: "",
    messages: []
}

const chatActions = {
    SET_USERNAME: "SET_USERNAME",
    SET_ROOM: "SET_ROOM",
    SET_CURRENT_MESSAGE: "SET_CURRENT_MESSAGE",
    SET_MESSAGES: "SET_MESSAGES",
    SET_IS_JOINED: "SET_IS_JOINED"
}

const chatReducer = (state, action) => {
    switch(action.type) {
        case chatActions.SET_USERNAME:
            return {
                ...state,
                username: action.value
            }
        case chatActions.SET_ROOM:
            return {
                ...state,
                room: action.value
            }
        case chatActions.SET_CURRENT_MESSAGE:
            return {
                ...state,
                currentMessage: action.value
            }
        case chatActions.SET_MESSAGES:
            return {
                ...state,
                messages: action.value
            }
        case chatActions.SET_IS_JOINED:
            return {
                ...state,
                isJoined: action.value
            }
        default:
            return state;
    }
};

const ChatContext = createContext(initialState);

const ChatProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    const updateValue = (type, value) => dispatch({ type, value })
    
    return (
        <ChatContext.Provider value={{...state, updateValue}}>
            {children}
        </ChatContext.Provider>
    )
};

export { ChatProvider, chatActions };

export default ChatContext;
