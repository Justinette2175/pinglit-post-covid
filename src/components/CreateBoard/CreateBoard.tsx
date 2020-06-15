import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Typography, Button, Box } from "@material-ui/core";
import { NumberInput } from "../inputs";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { NewBoard } from "../../types";

interface FormValues {}

interface CreateBoardProps {
  onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onClose }) => {
  const [user] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const createBoard = async (newBoard: NewBoard) => {
    try {
      await firebase.firestore.collection("boards").add(newBoard);
      onClose();
    } catch (e) {
      console.log("error creating board", e);
    }
  };

  const handleSubmit = (values: FormValues) => {
    const newBoard: NewBoard = {
      owners: {
        [user.uid]: {
          username: user.username || "",
          hasAccess: true,
        },
      },
      stepUnit: {
        type: "INTEGER",
        key: "p.",
      },
      pinCount: 0,
      content: {
        type: "BOOK",
        title: "The Great Gatsby",
        author: "Scott Fitzgerald",
      },
    };
    createBoard(newBoard);
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
              Create board
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateBoard;
