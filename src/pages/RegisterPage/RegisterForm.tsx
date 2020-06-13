import React from "react";
import { FormValues } from "./RegisterPage";
import { TextInput } from "../../components/inputs";
import { Formik, Form } from "formik";
import * as yup from "yup";

import { Button } from "@material-ui/core";

interface RegisterFormProps {
  onSubmit: (values: FormValues) => void;
  error?: Error;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, error }) => {
  const validationSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnMount={true}
      initialValues={{
        email: "",
        password: null,
      }}
      onSubmit={onSubmit}
    >
      {({ isValid }) => (
        <Form>
          <TextInput label="Email" name="email" />
          <TextInput label="Password" name="password" type="password" />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!isValid}
          >
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
