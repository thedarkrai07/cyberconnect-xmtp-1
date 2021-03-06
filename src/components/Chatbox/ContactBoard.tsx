import { Spacer, Stack, useColorMode } from "@chakra-ui/react";
import { getAddress } from "ethers/lib/utils";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import useXmtp from "../../hooks/useXmtp";
import { SocialConnection } from "../../types/AllSocialConnections";
import conversationsToConnection from "../../utils/conversationsToConnections";
import Member from "../Member";
import { WalletConnectButton } from "../WalletConnectButton";
import Conversation from "../XMTP";
import EmptyScreen from "./EmptyScreen";
import LoadingScreen from "./LoadingScreen";

interface Props {}

const ContactBoard: React.FC<Props> = () => {
    const { isOpen, conversationWith } = useNavStates();
    const { conversations } = useXmtp();

    const {
        followingList,
        graphAddress,
        graphLoading,
        friendList,
        showMutualConnections,
        showXMTPConnects,
    } = useGraph();

    const { colorMode } = useColorMode();

    const connections = showXMTPConnects
        ? conversationsToConnection(conversations)
        : showMutualConnections
        ? conversationsToConnection(conversations, friendList)
        : conversationsToConnection(conversations, followingList);

    const justifyContent =
        !conversationWith.address && connections.length > 0
            ? "flex-start"
            : "center";

    if (!isOpen) return <></>;

    return (
        <Stack
            height={"400px"}
            align="center"
            justifyContent={justifyContent}
            bg={colorMode === 'dark' ? "gray.900" : "gray.100"}
            overflow={"scroll"}
        >
            {!graphAddress && <WalletConnectButton />}
            {graphLoading && <LoadingScreen />}
            {graphAddress && !graphLoading && !followingList.length && (
                <EmptyScreen />
            )}
            {!conversationWith.address &&
                connections.map((m) => (
                    <Member
                        connection={m as SocialConnection}
                        key={m.address}
                    />
                ))}
            {conversationWith.address && (
                <Conversation
                    recipientWalletAddr={getAddress(conversationWith.address)}
                />
            )}
            {graphAddress && !graphLoading && followingList.length && (
                <Spacer />
            )}
        </Stack>
    );
};

export default ContactBoard;
