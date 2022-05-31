import { Stack, Text } from "@chakra-ui/react";
import React from "react";
import { LoremIpsum } from "react-lorem-ipsum";

const WebsitePlaceholder = () => {
    return (
        <Stack>
            <Text p={10} fontSize="3xl" align={"center"}>
                Sample Website
            </Text>

            <Text p={10} align="center">
                <LoremIpsum p={1} avgSentencesPerParagraph={2} />
            </Text>
            <Text p={5}>
                <LoremIpsum p={10} avgSentencesPerParagraph={8} />
            </Text>
        </Stack>
    );
};

export default WebsitePlaceholder;
