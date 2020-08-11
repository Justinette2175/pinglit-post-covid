import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext, BoardContext } from "../../contexts";
import { Button, Box, Divider, Typography } from "@material-ui/core";
import { NumberInput, Select, TextInput, LinkInput } from "../inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NewPin, PinPermission, LinkPreview } from "../../types";
import PinContentTypeInput, { PinContentType } from "./PinContentTypeInput";

const PERMISSION_OPTIONS: Array<{ label: string; value: PinPermission }> = [
  { label: "Only me", value: "PRIVATE" },
  { label: "Anyone who has access to this board", value: "BOARD" },
];

interface FormValues {
  permission: PinPermission;
  percentage: number;
  stepValue: number | string;
  quote: string;
  text: string;
  link: {
    url: string;
    metadata: LinkPreview;
  };
}

interface CreatePinProps {
  onClose: () => void;
  startStep?: number;
  endStep?: number;
}

const CreatePin: React.FC<CreatePinProps> = ({
  startStep,
  endStep,
  onClose,
}) => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [selectedType, setSelectedType] = useState<PinContentType>(null);

  const board = useContext(BoardContext);
  const boardId = board ? board.uid : null;

  const createPin = async (newPin: NewPin) => {
    try {
      await firebase.firestore.collection("pins").add(newPin);
      onClose();
    } catch (e) {
      console.log("error creating pin", e);
    }
  };

  const handleSubmit = (values: FormValues) => {
    let content = [];
    if (selectedType && selectedType === "LINK" && values.link) {
      content.push({ ...values.link, type: "LINK" });
    } else if (selectedType && selectedType === "TEXT" && values.text) {
      content.push({ text: values.text, type: "TEXT" });
    }
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
        stepValue: values.stepValue,
      },
      referenceQuote: values.quote,
      content,
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
    <>
      <Formik
        validationSchema={validationSchema}
        validateOnMount={true}
        initialValues={{
          permission: "PRIVATE",
          percentage: 0,
          stepValue: null,
          quote: "",
          text: "",
          link: {
            url: "",
            metadata: null,
          },
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid, values }) => (
          <Form>
            <Box maxWidth="100px">
              {board.stepUnit.type === "INTEGER" ? (
                <NumberInput
                  name="stepValue"
                  label={board.stepUnit.longName || board.stepUnit.key}
                  fullWidth
                />
              ) : (
                <TextInput
                  name="stepValue"
                  label={board.stepUnit.longName || board.stepUnit.key}
                  fullWidth
                />
              )}
            </Box>
            <TextInput
              name="quote"
              label="Quote from the book"
              multiline
              rows={4}
              fullWidth
            />

            <Divider />

            <Typography>Add content to your pin</Typography>
            <PinContentTypeInput
              onUpdate={setSelectedType}
              value={selectedType}
            />
            {selectedType === "LINK" && (
              <LinkInput
                name="link"
                label="Copy paste a link from the internet"
              />
            )}
            {selectedType === "TEXT" && (
              <TextInput
                name="text"
                label="Write something about this pin"
                fullWidth
              />
            )}
            <Divider />
            <Select
              fullWidth
              name="permission"
              label="Who can see this?"
              options={PERMISSION_OPTIONS}
            />
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
    </>
  );
};

export default CreatePin;
