import { Conversation } from "@xmtp/xmtp-js/dist/types/src";
import { SocialConnection } from "../types/AllSocialConnections";

const conversationsToConnection = (
    conversation: Conversation[],
    filterList?: SocialConnection[]
): SocialConnection[] => {
    if (!filterList) {
        return conversation.map((c) => {
            return {
                address: c.peerAddress,
            } as SocialConnection;
        });
    }

    const conversationArr = conversation.map((c) =>
        c.peerAddress.toLocaleLowerCase()
    );

    return filterList.filter((f) => conversationArr.includes(f.address));
};

export default conversationsToConnection;