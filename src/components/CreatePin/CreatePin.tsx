import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Typography, Button, Box } from "@material-ui/core";
import { NumberInput } from "../inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NewPin } from "../../types";

interface FormValues {}

interface CreatePinProps {
  boardId: string;
  onClose: () => void;
  startStep?: number;
  endStep?: number;
}

const CreatePin: React.FC<CreatePinProps> = ({
  boardId,
  startStep,
  endStep,
}) => {
  const [user] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const createPin = async (newPin: NewPin) => {
    try {
      await firebase.firestore.collection("pins").add(newPin);
    } catch (e) {
      console.log("error creating pin", e);
    }
  };

  const handleSubmit = (values: FormValues) => {
    const newPin: NewPin = {
      createdBy: {
        username: user.username || "",
        userId: user.uid,
      },
      boardId,
      commentsCount: 0,
      location: {
        percentage: 98,
        stepValue: 100,
      },
      referenceQuote: "My test quote 1",
      content: [
        { type: "TEXT", text: "An interesting comment I'm making here" },
      ],

      labels: {},
      reactions: {},
    };
    createPin(newPin);
  };

  return (
    <Box p={4} width={"500px"}>
      <Formik validateOnMount={true} initialValues={{}} onSubmit={handleSubmit}>
        {({ isValid, values }) => (
          <Form>
            <Box mb={3}>
              <NumberInput name="page" label="Page" />
            </Box>

            <Button type="submit" color="primary" variant="contained">
              Épingler
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreatePin;
