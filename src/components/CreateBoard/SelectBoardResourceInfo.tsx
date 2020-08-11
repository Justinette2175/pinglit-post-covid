import React, { useState } from "react";
import SearchBar from "../SearchBar";
import { useField } from "formik";
import { Button, Typography, Box } from "@material-ui/core";

interface SelectBoardResourceInfoProps {
  resourceType: string;
  onNext: () => void;
  onPrevious: () => void;
}

const SelectBoardResourceInfo: React.FC<SelectBoardResourceInfoProps> = ({
  resourceType,
  onNext,
  onPrevious,
}) => {
  const [field, meta, helpers] = useField("resource");
  const [manualSelect, setManualSelect] = useState<boolean>(
    resourceType !== "BOOK"
  );

  if (!manualSelect) {
    return (
      <>
        <Typography variant="h2">Search for your book</Typography>
        <SearchBar
          onBookSelect={(book) => {
            helpers.setValue(book);
            onNext();
          }}
        />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={onPrevious}>Back</Button>
          <Button onClick={() => setManualSelect(true)}>
            I can't find my book
          </Button>
        </Box>
      </>
    );
  } else {
    return (
      <>
        <Button onClick={onNext}>Next</Button>
      </>
    );
  }
};

export default SelectBoardResourceInfo;
