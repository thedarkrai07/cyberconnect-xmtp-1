import { Spacer, Stack } from "@chakra-ui/react";
import { useNavStates } from "../../context/ChatContext";
import { useGraph } from "../../context/GraphContext";
import Member from "../Member";
import { WalletConnectButton } from "../WalletConnectButton";
import EmptyScreen from "./EmptyScreen";
import LoadingScreen from "./LoadingScreen";

interface Props {}

const ContactBoard: React.FC<Props> = () => {
    const { isOpen } = useNavStates();

    const { followingList, graphAddress, graphLoading, friendList, showMutualConnections } = useGraph();
    const connections = !showMutualConnections ? followingList : friendList;

    if (!isOpen) return <></>;

    return (
        <Stack height={"400px"} align="center" justifyContent={"center"}>
            {!graphAddress && <WalletConnectButton/>}
            {graphLoading && <LoadingScreen/>}
            {graphAddress && !graphLoading && !followingList.length && <EmptyScreen/>}
            {connections.map((m) => (
                <Member connection={m} />
            ))}
            {graphAddress && !graphLoading && followingList.length && <Spacer/>}
        </Stack>
    );
};

export default ContactBoard;
