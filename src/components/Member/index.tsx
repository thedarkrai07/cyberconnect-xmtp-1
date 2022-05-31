import { Button, Image, Link, Spacer, Stack, Text } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
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
                <Button>  
                    <BiMailSend />&nbsp; Connect
                </Button>
            )}
        </Stack>
    );
};

export default Member;
