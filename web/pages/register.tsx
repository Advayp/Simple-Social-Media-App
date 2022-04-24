import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useState } from "react";
import Router from "next/router";
import { WarningTwoIcon } from "@chakra-ui/icons";

const Register: NextPage = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
                                    Register
                                </Button>
                            </Form>
                        </div>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};

export default Register;
