import {
    Flex,
    Heading,
    Spacer,
    Text,
    Link,
    Box,
    Image,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface Props {}

export const Navbar: React.FC<Props> = () => {
    return (
        <>
            <Flex align={"center"} height="7vh">
                <Image
                    src="https://prod.cloud.rockstargames.com/crews/sc/3857/22389587/publish/emblem/emblem_256.png"
                    boxSize={9}
                    borderRadius={"full"}
                    ml={4}
                ></Image>
                <Heading size={"md"} ml={4}>
                    Commies
                </Heading>
                <Spacer />
                <Box mr={5}>
                    <NextLink href="/" passHref>
                        <Link>Home</Link>
                    </NextLink>
                </Box>
                <Box mr={5}>
                    <NextLink href="/register" passHref>
                        <Link>Register</Link>
                    </NextLink>
                </Box>
            </Flex>
            <hr></hr>
        </>
    );
};
