import { Box, Button, Text, Link, Heading, useToast } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useState } from "react";
import Router from "next/router";
import { WarningTwoIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const Register: NextPage = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const toast = useToast();

    return (
        <>
            <Navbar />
            <Wrapper variant="small">
                <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values) => {
                        const response = await (
                            await fetch("http://localhost:4000/user/register", {
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
                            toast({
                                title: `Welcome, ${values.username}`,
                                description: "Registration Successful",
                                status: "success",
                                isClosable: true,
                                duration: 2000,
                                position: "bottom-left",
                            });
                            Router.push("/dashboard");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <div>
                            <Heading mb={4} fontSize="3xl" textAlign={"center"}>
                                Register
                            </Heading>
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
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        password
                                        showText={showPassword}
                                        passwordOnClick={() => {
                                            setShowPassword(!showPassword);
                                        }}
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
                                    Register
                                </Button>
                            </Form>
                            <Text mt={4}>
                                Already have an account?{" "}
                                <NextLink href="/login">
                                    <Link fontWeight={"medium"}>
                                        Login Here.
                                    </Link>
                                </NextLink>
                            </Text>
                        </div>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};

export default Register;
