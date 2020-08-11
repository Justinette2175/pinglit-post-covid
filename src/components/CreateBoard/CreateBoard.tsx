import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Form, Formik } from "formik";
import { NewBoard, BoardContentType, StepUnit } from "../../types";
import uuid from "uuid-v4";

import SelectBoardResourceType from "./SelectBoardResourceType";
import SelectBoardResourceInfo from "./SelectBoardResourceInfo";
import ReviewBoardInfo from "./ReviewBoardInfo";

interface FormValues {
  type: BoardContentType;
  resource: any;
  unit: string;
  unitType: StepUnit;
  startStep: number;
  endStep: number;
}

interface CreateBoardProps {
  onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onClose }) => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [step, setStep] = useState<number>(1);

  const createBoard = async (newBoard: NewBoard) => {
    try {
      await firebase.firestore.collection("boards").add(newBoard);
      onClose();
    } catch (e) {
      console.log("error creating board", e);
    }
  };

  const handleSubmit = (values: FormValues) => {
    const versionId = uuid();
    const newBoard: NewBoard = {
      owners: {
        [user.uid]: {
          username: user.username || "",
        },
      },
      members: {
        [user.uid]: {
          username: user.username || "",
          hasAccess: true,
          version: versionId,
        },
      },
      stepUnit: {
        type: values.unitType,
        key: values.unit,
      },
      pinCount: 0,
      type: values.type,
      resource: values.resource,
      versions: {
        [versionId]: {
          ...values.resource,
          startStep: values.startStep,
          endStep: values.endStep,
        },
      },
    };
    createBoard(newBoard);
  };

  return (
    <>
      <Formik
        validateOnMount={true}
        initialValues={{
          type: "BOOK",
          resource: null,
          unit: "p.",
          unitType: "INTEGER",
          startStep: null,
          endStep: null,
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid, setFieldValue, values }) => (
          <Form>
            {step === 1 && (
              <SelectBoardResourceType onNext={() => setStep(2)} />
            )}
            {step === 2 && values.type === "BOOK" && (
              <SelectBoardResourceInfo
                resourceType={values.type}
                onNext={() => setStep(3)}
                onPrevious={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <ReviewBoardInfo
                onEditResource={() => setStep(2)}
                resource={values.resource}
              />
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateBoard;
