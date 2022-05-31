import { createContext, useContext, useState } from "react";
import styles from "../components/Chatbox/index.module.css";

interface ChatContextInterface {
    isOpen: boolean;
    setIsOpen: (x: boolean) => void;
    conversationWithAddress: string;
    setConversationWithAddress: (x: string) => void;
    setShowModal: (x: boolean) => void;
    showModal: boolean;
}
export const ChatContext = createContext<ChatContextInterface>({
    isOpen: false,
    setIsOpen: async () => undefined,
    conversationWithAddress: "",
    setConversationWithAddress: async () => undefined,
    setShowModal: async () => undefined,
    showModal: false,
});

export const ChatContextProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [conversationWithAddress, setConversationWithAddress] =
        useState<string>("");

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                setIsOpen,
                conversationWithAddress,
                setConversationWithAddress,
                setShowModal,
                showModal,
            }}
        >
            <div className={styles.messageBox}>{children}</div>
        </ChatContext.Provider>
    );
};

export const useNavStates = () => {
    const graph = useContext(ChatContext);
    return graph;
};
