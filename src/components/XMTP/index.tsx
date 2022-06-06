import { Stack, Text } from "@chakra-ui/react";
import { useRef } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import useConversation from "../../hooks/useConversation";
import useXmtp from "../../hooks/useXmtp";
import { MessageComposer, MessagesList } from "./Conversation";
import Loader from "./Loader";

const Conversation = ({
    recipientWalletAddr,
}: {
    recipientWalletAddr: string;
}) => {
    const { walletAddress, client } = useXmtp();
    const messagesEndRef = useRef(null);

    const { messages, sendMessage, loading, error } =
        useConversation(recipientWalletAddr);

    if (!recipientWalletAddr || !walletAddress || !client) {
        return <div />;
    }
    if (loading && !messages?.length) {
        return (
            <Loader
                headingText="Loading messages..."
                subHeadingText="Please wait a moment"
                isLoading
            />
        );
    }

    return (
        <>
            <Stack w={"100%"} h={"340px"} overflow={"scroll"}>
                <MessagesList
                    messagesEndRef={messagesEndRef}
                    messages={messages}
                    walletAddress={walletAddress}
                />
                {error && (
                    <Stack
                        direction={"column"}
                        alignItems={"center"}
                        p={5}
                        h={"100%"}
                        justifyContent="center"
                    >
                        <RiErrorWarningFill fontSize={"xl"} />
                        <Text align={"center"}>{error?.message}</Text>
                    </Stack>
                )}
            </Stack>
            {walletAddress && (
                <MessageComposer onSend={sendMessage} error={error} />
            )}
        </>
    );
};

export default Conversation;
