import { useColorMode } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import styles from "../components/Chatbox/index.module.css";
import { SocialConnection } from "../types/AllSocialConnections";

interface ChatContextInterface {
    isOpen: boolean;
    setIsOpen: (x: boolean) => void;
    conversationWith: SocialConnection;
    setConversationWith: (x: SocialConnection) => void;
    setShowModal: (x: boolean) => void;
    showModal: boolean;
}
export const ChatContext = createContext<ChatContextInterface>({
    isOpen: false,
    setIsOpen: async () => undefined,
    conversationWith: {} as SocialConnection,
    setConversationWith: async () => undefined,
    setShowModal: async () => undefined,
    showModal: false,
});

export const ChatContextProvider: React.FC<{
    children: any;
}> = ({ children }) => {
    const { colorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [conversationWith, setConversationWith] = useState<SocialConnection>(
        {} as SocialConnection
    );

    return (
        <ChatContext.Provider
            value={{
                isOpen,
                setIsOpen,
                conversationWith,
                setConversationWith,
                setShowModal,
                showModal,
            }}
        >
            <div
                className={`${styles.messageBox}  ${
                    colorMode === "dark" ? styles.darkbox : styles.lightbox
                }`}
            >
                {children}
            </div>
        </ChatContext.Provider>
    );
};

export const useNavStates = () => {
    const graph = useContext(ChatContext);
    return graph;
};
