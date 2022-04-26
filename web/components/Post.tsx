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
import { MdThumbUp, MdThumbDown } from "react-icons/md";

interface Props {
    title: string;
    username: string;
    userRank: number;
    profilePicture: string;
    children?: JSX.Element;
    badge?: JSX.Element;
}

export const Post: React.FC<Props> = ({
    title,
    children,
    username,
    userRank,
    badge,
    profilePicture,
}) => {
    return (
        <>
            <Box
                maxW={"2xl"}
                minW={"xl"}
                borderWidth={"1.5px"}
                m={4}
                mx={"auto"}
                borderRadius={"lg"}
                overflow="hidden"
                p={4}
                boxShadow="md"
            >
                <Flex align={"center"} columnGap={3}>
                    <Image src={profilePicture} width={"50px"} height="auto" />
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
                        icon={<MdThumbUp />}
                    />
                    <IconButton
                        aria-label="Dislike this post"
                        icon={<MdThumbDown />}
                    />
                </Flex>
            </Box>
        </>
    );
};
