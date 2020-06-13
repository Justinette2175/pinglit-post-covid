import React from "react";
import { TextField, TextFieldProps } from "@material-ui/core";
import { useField } from "formik";

export const TextInput = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name, ...rest }: TextFieldProps, ref) => {
    const typedName = name as string;
    const [field, meta] = useField(typedName);

    return (
      <TextField
        margin="normal"
        {...rest}
        {...field}
        error={meta.touched && meta.error ? true : false}
        helperText={(meta.touched && meta.error) || ""}
        InputLabelProps={{ shrink: true }}
        ref={ref}
        variant="filled"
      />
    );
  }
);