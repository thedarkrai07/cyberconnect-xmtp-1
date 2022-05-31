import { Image, Link, Spacer, Stack, Text, useToast } from "@chakra-ui/react";
import {
    Blockchain,
    Env,
    FollowButton
} from "@cyberconnect/react-follow-button";
import { useNavStates } from "../../context/ChatContext";
import { useWeb3 } from "../../context/web3Context";
import { SocialConnection } from "../../types/AllSocialConnections";
import formatAddress from "../../utils/formatAddress";
import styles from "./index.module.css";
const defaultImgURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const Member = ({
    connection,
    showConnectButton,
}: {
    connection: SocialConnection;
    showConnectButton?: boolean;
}) => {
    const toast = useToast();
    const { setShowModal } = useNavStates();
    const { provider } = useWeb3();
    console.log(window.ethereum, "tethehte");
    return (
        <Stack
            direction={"row"}
            width="100%"
            py={3}
            px={5}
            className={styles.member}
        >
            <Image
                src={connection.avatar || defaultImgURL}
                alt={connection.address}
                boxSize={"50px"}
                borderRadius="full"
            />
            <Stack px={2}>
                <Text fontSize="md">
                    {connection.ens ||
                        connection.alias ||
                        formatAddress(connection.address)}
                </Text>
                <Stack direction={"row"}>
                    <Link
                        href={`https://etherscan.io/address/${connection.address}`}
                        target="_blank"
                        fontSize={"sm"}
                        color="gray.500"
                    >
                        Etherscan
                    </Link>
                    <Link
                        href={`https://opensea.io/${connection.address}`}
                        target="_blank"
                        fontSize={"sm"}
                        color="gray.500"
                    >
                        NFTs
                    </Link>
                </Stack>
            </Stack>
            <Spacer />
            {showConnectButton && (
                    <FollowButton
                        provider={window.ethereum}
                        namespace="CyberConnect"
                        toAddr={"0x99988890f2de1d59e1eb76d2f34cde371044b8c8"}
                        env={Env.PRODUCTION}
                        chain={Blockchain.ETH}
                        key={"0x99988890f2de1d59e1eb76d2f34cde371044b8c8"}
                        onSuccess={() => {
                            setShowModal(false);
                        }}
                        onFailure={(e) => {
                            console.log(connection.address, e);
                            toast({
                                title: "Unable to follow user",
                                description: e.message,
                                status: "error",
                                duration: 5000,
                                isClosable: true,
                                position: "bottom-left",
                            });
                        }}
                    />
            )}
        </Stack>
    );
};

export default Member;
