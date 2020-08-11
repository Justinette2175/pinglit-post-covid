import React from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Select } from "../inputs";
import { useField } from "formik";

interface SelectBoardResourceTypeProps {
  onNext: () => void;
}

const TYPE_OPTIONS = [{ label: "Book", value: "BOOK" }];

const SelectBoardResourceType: React.FC<SelectBoardResourceTypeProps> = ({
  onNext,
}) => {
  return (
    <>
      <Typography variant="h2">
        Which type of content do you want to annotate?
      </Typography>
      <Select fullWidth name="type" options={TYPE_OPTIONS} />
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={onNext}>Next</Button>
      </Box>
    </>
  );
};

export default SelectBoardResourceType;
