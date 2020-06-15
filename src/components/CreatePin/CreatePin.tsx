import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Button, Box } from "@material-ui/core";
import { NumberInput, Select, TextInput } from "../inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NewPin, PinPermission } from "../../types";

const PERMISSION_OPTIONS: Array<{ label: string; value: PinPermission }> = [
  { label: "Only me", value: "PRIVATE" },
  { label: "Anyone who has access to this board", value: "BOARD" },
];

interface FormValues {
  permission: PinPermission;
  percentage: number;
  quote: string;
  note: string;
}

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
  onClose,
}) => {
  const [user] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const createPin = async (newPin: NewPin) => {
    try {
      await firebase.firestore.collection("pins").add(newPin);
      onClose();
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
      permission: values.permission,
      boardId,
      commentsCount: 0,
      location: {
        percentage: values.percentage,
      },
      referenceQuote: values.quote,
      content: [{ type: "TEXT", text: values.note }],

      labels: {},
      reactions: {},
    };
    createPin(newPin);
  };

  const validationSchema = Yup.object().shape({
    permission: Yup.string().required(),
    percentage: Yup.number().required(),
  });

  return (
    <Box p={4} width={"500px"}>
      <Formik
        validationSchema={validationSchema}
        validateOnMount={true}
        initialValues={{
          permission: "PRIVATE",
          percentage: 0,
          quote: "",
          note: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid, values }) => (
          <Form>
            <Box mb={3}>
              <NumberInput name="percentage" label="Percentage" />
            </Box>
            <Box mb={3}>
              <TextInput name="quote" label="Quote" />
            </Box>
            <Box mb={3}>
              <TextInput name="note" label="Note" />
            </Box>
            <Box mb={3}>
              <Select
                name="permission"
                label="Permission"
                options={PERMISSION_OPTIONS}
              />
            </Box>
            <Button
              disabled={!isValid}
              type="submit"
              color="primary"
              variant="contained"
            >
              Create Pin
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreatePin;
