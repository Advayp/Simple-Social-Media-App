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

interface Props {
    isLoggedIn?: boolean;
}

export const Navbar: React.FC<Props> = ({ isLoggedIn }) => {
    return (
        <>
            <Flex align={"center"} height="7vh">
                <NextLink href="/" passHref>
                    <Link>
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKORs0X6AeLuVkqBULmksqb2jtaZNE60Ke3w&usqp=CAU"
                            boxSize={9}
                            borderRadius={"full"}
                            ml={4}
                        ></Image>
                    </Link>
                </NextLink>
                <NextLink href="/" passHref>
                    <Link>
                        <Heading size={"md"} ml={4}>
                            Whisper
                        </Heading>
                    </Link>
                </NextLink>
                <Spacer />
                <Box mr={5}>
                    <NextLink href="/" passHref>
                        <Link>Home</Link>
                    </NextLink>
                </Box>
                {!isLoggedIn && (
                    <>
                        <Box mr={5}>
                            <NextLink href="/register" passHref>
                                <Link>Register</Link>
                            </NextLink>
                        </Box>
                        <Box mr={5}>
                            <NextLink href="/login" passHref>
                                <Link>Login</Link>
                            </NextLink>
                        </Box>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <Box
                            mr={5}
                            onClick={() => {
                                fetch("http://localhost:4000/user/logout");
                            }}
                        >
                            <NextLink href="/login" passHref>
                                <Link>Logout</Link>
                            </NextLink>
                        </Box>
                    </>
                )}
            </Flex>
            <hr></hr>
        </>
    );
};
