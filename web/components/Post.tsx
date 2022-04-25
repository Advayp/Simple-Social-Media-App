import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { GenerateSeed } from "../utils/RandomStringGenerator";

interface Props {
    title: string;
    username: string;
    userRank: number;
    children?: JSX.Element;
    badge?: JSX.Element;
}

export const Post: React.FC<Props> = ({
    title,
    children,
    username,
    userRank,
    badge,
}) => {
    return (
        <>
            <Box
                maxW={"2xl"}
                borderWidth={"1.5px"}
                m={4}
                borderRadius={"lg"}
                overflow="hidden"
                p={4}
                boxShadow="md"
            >
                <Flex align={"center"} columnGap={3}>
                    <Image
                        src={`https://avatars.dicebear.com/api/bottts/${GenerateSeed(
                            12
                        )}.svg`}
                        width={"50px"}
                        height="auto"
                    />
                    <Box>
                        <Text fontWeight={"semibold"}>
                            {username} {badge}
                        </Text>
                        <Text fontWeight={"normal"}>Rank {userRank}</Text>
                    </Box>
                </Flex>
                <Heading fontSize={"3xl"} mt={4}>
                    {title}
                </Heading>
                <Divider />
                <Text fontSize="large">{children}</Text>
                <Flex mt={4} columnGap={1}>
                    <IconButton
                        aria-label="Like this post"
                        icon={<ChevronUpIcon />}
                    />
                    <IconButton
                        aria-label="Dislike this post"
                        icon={<ChevronDownIcon />}
                    />
                </Flex>
            </Box>
        </>
    );
};
