import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useState, useEffect } from "react";
import Router from "next/router";
import { WarningTwoIcon } from "@chakra-ui/icons";

const Login: NextPage = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await (
                await fetch("http://localhost:4000/user/me", { method: "GET" })
            ).json();

            if (data.user) {
                Router.push("/dashboard");
                return;
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <Wrapper variant="small">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values) => {
                        const response = await (
                            await fetch("http://localhost:4000/user/login", {
                                method: "POST",
                                body: JSON.stringify({
                                    name: values.username,
                                    password: values.password,
                                }),
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                },
                            })
                        ).json();
                        console.log(response);
                        if (response.errors) {
                            setIsError(true);
                            setErrorMessage(response.errors[0].message);
                        } else {
                            setErrorMessage("");
                            setIsError(false);
                            Router.push("/dashboard");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <div>
                            <Form>
                                <InputField
                                    name="username"
                                    placeholder="Username"
                                    label="Username"
                                />
                                <Box mt={4}>
                                    <InputField
                                        name="password"
                                        placeholder="Password"
                                        label="Password"
                                        type="password"
                                    />
                                </Box>
                                {isError && (
                                    <>
                                        <Text color="tomato" mt={4}>
                                            <WarningTwoIcon mb={1} />{" "}
                                            {errorMessage}
                                        </Text>
                                    </>
                                )}
                                <Button
                                    mt={4}
                                    type="submit"
                                    isLoading={isSubmitting}
                                    colorScheme="yellow"
                                >
                                    Login
                                </Button>
                            </Form>
                        </div>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};

export default Login;