import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Typography, Button, Box } from "@material-ui/core";
import { NumberInput, TextInput } from "../inputs";
import { Form, Formik } from "formik";

interface NewCommentFormProps {
  pinId: string;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ pinId }) => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const handleSubmit = async (
    { comment }: { comment: string },
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await firebase.firestore
        .collection("pins")
        .doc(pinId)
        .collection("comments")
        .add({
          createdBy: {
            uid: user.uid,
            username: user.username,
          },
          content: {
            text: comment,
          },
        });
      resetForm();
      setSubmitting(false);
    } catch (e) {
      setSubmitting(false);
      console.log(e);
      //
    }
  };

  return (
    <Formik
      validateOnMount={true}
      initialValues={{
        comment: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ isValid, values }) => (
        <Form>
          <Box mb={3}>
            <TextInput name="comment" fullWidth />
          </Box>
          <Button
            type="submit"
            size="small"
            color="primary"
            variant="contained"
          >
            Add comment
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default NewCommentForm;
