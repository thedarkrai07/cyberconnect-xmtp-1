import { Divider, Spacer, Stack, Switch, Text } from "@chakra-ui/react";
import { useGraph } from "../../../context/GraphContext";

const Footer = () => {
    const { showMutualConnections, setShowMutualConnections } = useGraph();
    const updateState = (e: any) => {
        setShowMutualConnections(e.target.checked);
    }
    return (
        <>
            <Divider />
            <Stack px={6} py={3} direction="row" align={"right"}>
                <Spacer />
                <Text>Show Mutual Connections Only</Text>{" "}
                <Switch
                    isChecked={showMutualConnections}
                    onChange={updateState}
                />
            </Stack>
        </>
    );
};

export default Footer;
