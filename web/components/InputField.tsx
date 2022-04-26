import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    InputRightAddon,
    InputGroup,
    Button,
    Textarea,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    password?: boolean;
    showText?: boolean;
    useTextField?: boolean;
    passwordOnClick?: React.MouseEventHandler<HTMLInputElement>;
};

// '' => false
// 'error message stuff' => true

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    password,
    showText,
    passwordOnClick,
    useTextField,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputGroup>
                {useTextField ? (
                    <Textarea
                        id={field.name}
                        size="md"
                        {...field}
                        placeholder={props.placeholder}
                        minHeight="20rem"
                    />
                ) : (
                    <Input {...field} {...props} id={field.name} />
                )}
                {password && (
                    <>
                        <InputRightAddon
                            width={"1rem"}
                            alignItems="center"
                            justifyContent={"center"}
                        >
                            <Button onClick={passwordOnClick}>
                                {showText ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightAddon>
                    </>
                )}
            </InputGroup>
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};
