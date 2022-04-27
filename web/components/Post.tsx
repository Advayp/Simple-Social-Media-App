import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Image,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GenerateSeed } from "../utils/RandomStringGenerator";
import { MdThumbUp, MdThumbDown } from "react-icons/md";

type ButtonClick = "Like" | "Dislike" | "";

interface Props {
    title: string;
    username: string;
    userRank: number;
    profilePicture: string;
    initialLikes: number;
    initialDislikes: number;
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
    initialLikes,
    initialDislikes,
}) => {
    const [buttonClicked, setButtonClicked] = useState<ButtonClick>("");
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);

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
                    <Button
                        leftIcon={<MdThumbUp />}
                        colorScheme={buttonClicked === "Like" ? "green" : null}
                        onClick={async () => {
                            if (buttonClicked === "Dislike") {
                                setDislikes(dislikes - 1);
                            }
                            if (buttonClicked === "Like") {
                                setButtonClicked("");
                                setLikes(likes - 1);
                                if (likes <= 0) {
                                    setLikes(0);
                                }
                                return;
                            }
                            setButtonClicked("Like");
                            setLikes(likes + 1);
                            const data = await (
                                await fetch("http://localhost:4000/post/like", {
                                    method: "POST",
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        title,
                                        username,
                                    }),
                                })
                            ).json();
                            console.log(data);
                        }}
                    >
                        {likes}
                    </Button>
                    <Button
                        leftIcon={<MdThumbDown />}
                        colorScheme={buttonClicked === "Dislike" ? "red" : null}
                        onClick={async () => {
                            if (buttonClicked === "Like") {
                                setLikes(likes - 1);
                            }
                            if (buttonClicked === "Dislike") {
                                setButtonClicked("");
                                setDislikes(dislikes - 1);
                                if (dislikes <= 0) {
                                    setDislikes(0);
                                }
                                return;
                            }
                            setButtonClicked("Dislike");
                            setDislikes(dislikes + 1);
                            const data = await (
                                await fetch(
                                    "http://localhost:4000/post/dislike",
                                    {
                                        method: "POST",
                                        headers: {
                                            Accept: "application/json",
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            title,
                                            username,
                                        }),
                                    }
                                )
                            ).json();
                            console.log(data);
                        }}
                    >
                        {dislikes}
                    </Button>
                </Flex>
            </Box>
        </>
    );
};
