import {
    Flex,
    Heading,
    Spinner,
    useToast,
    Spacer,
    Button,
    Box,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import Router from "next/router";
import { Post } from "../components/Post";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { MyBadge } from "../components/MyBadge";

const Dashboard: NextPage = () => {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const toast = useToast();
    const rendered = useRef(false);
    const userInfo = useRef({ name: "Error", badge: "Err" });
    const fetchData = async () => {
        const data = await (
            await fetch("http://localhost:4000/user/me", {
                method: "GET",
            })
        ).json();
        console.log(data);
        if (!data.user) {
            Router.push("/register");
            if (!rendered.current) {
                toast({
                    title: "Access Denied",
                    description:
                        "Please register/login to access your dashboard",
                    status: "error",
                    isClosable: true,
                    duration: 3000,
                    position: "bottom-left",
                });
            }
            setIsLoggedIn(false);
            rendered.current = true;
            return;
        }
        setUsername(data.user.name);
        setIsLoggedIn(true);
        const postData = await (
            await fetch("http://localhost:4000/post/all", { method: "GET" })
        ).json();
        setPosts([...postData]);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (username !== "") {
            toast({
                title: `Welcome, ${username}`,
                description: "Login Successful",
                status: "success",
                isClosable: true,
                duration: 2000,
                position: "bottom-left",
            });
        }
    }, [username]);

    return (
        <>
            <Navbar isLoggedIn />
            {!isLoggedIn && (
                <>
                    <Flex
                        align={"center"}
                        justify={"center"}
                        width="100vw"
                        height={"92vh"}
                        mx={"auto"}
                    >
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="yellow.400"
                            size="xl"
                            mb={10}
                        />
                    </Flex>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Flex>
                        <Flex
                            boxSize={"md"}
                            borderRightWidth="1.5px"
                            boxShadow={"md"}
                            position="fixed"
                            height={"100vh"}
                            p={4}
                            direction="column"
                            rowGap={4}
                            maxW={"400px"}
                            align={"center"}
                        >
                            <Heading>Create Post</Heading>
                            <Formik
                                initialValues={{ title: "", content: "" }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <div>
                                        <Form>
                                            <InputField
                                                name="title"
                                                placeholder="Title"
                                                label="Title"
                                            />
                                            <Box mt={4}>
                                                <InputField
                                                    name="content"
                                                    placeholder="Enlighten the world..."
                                                    label="Content"
                                                    useTextField
                                                />
                                            </Box>
                                            <Button
                                                mt={6}
                                                type="submit"
                                                isLoading={isSubmitting}
                                                colorScheme="yellow"
                                                minW={"370px"}
                                            >
                                                Create Post
                                            </Button>
                                        </Form>
                                    </div>
                                )}
                            </Formik>
                        </Flex>
                        <Spacer />
                        <Flex direction={"column"}>
                            {posts.map((v, idx) => {
                                return (
                                    <Post
                                        title={v.title}
                                        userRank={v.userId}
                                        username={v.user.name}
                                        badge={
                                            <MyBadge
                                                badgeLabel={
                                                    v.user.badge === null
                                                        ? "Old"
                                                        : v.user.badge
                                                }
                                                key={idx}
                                            />
                                        }
                                        key={idx}
                                    >
                                        {v.content}
                                    </Post>
                                );
                            })}
                        </Flex>
                        <Spacer />
                    </Flex>
                </>
            )}
        </>
    );
};

export default Dashboard;
