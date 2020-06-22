import React from "react";
import { useFormikContext } from "formik";

interface ChangeHandlerProps {}

const ChangeHandler: React.FC<ChangeHandlerProps> = () => {
  // Grab values and submitForm from context
  const { values, submitForm } = useFormikContext();
  React.useEffect(() => {
    submitForm();
  }, [values, submitForm]);
  return null;
};

export default ChangeHandler;
