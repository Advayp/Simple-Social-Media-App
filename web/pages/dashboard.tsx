import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import Router from "next/router";

const Dashboard: NextPage = () => {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await (
                await fetch("http://localhost:4000/user/me", {
                    method: "GET",
                })
            ).json();
            console.log(data);
            if (!data.user) {
                setIsLoggedIn(false);
                Router.push("/register");
                return;
            }
            setUsername(data.user.name);
            setIsLoggedIn(true);
        };

        fetchData();
    }, []);

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
                    <Heading>Hello, {username}</Heading>
                </>
            )}
        </>
    );
};

export default Dashboard;
