import { Box, Button, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import type { NextPage } from "next";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { Wrapper } from "../components/Wrapper";
import { useState } from "react";

const Register: NextPage = () => {
    const [isError, setIsError] = useState(false);

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
                            console.log(response.errors[0].message);
                        } else {
                            setIsError(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <div>
                            <Form>
                                <InputField
                                    name="username"
                                    placeholder="username"
                                    label="Username"
                                />
                                <Box mt={4}>
                                    <InputField
                                        name="password"
                                        placeholder="password"
                                        label="Password"
                                        type="password"
                                    />
                                </Box>
                                {isError && (
                                    <Text color="tomato" mt={4}>
                                        Error!
                                    </Text>
                                )}
                                <Button
                                    mt={4}
                                    type="submit"
                                    isLoading={isSubmitting}
                                    colorScheme="teal"
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
