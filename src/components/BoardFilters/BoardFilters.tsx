import React, { useContext, useState, useEffect } from "react";
import { UserContext, BoardContext } from "../../contexts";
import { Formik, useFormikContext, Form } from "formik";
import { MultipleChoice } from "../inputs";
import { Box, Typography } from "@material-ui/core";
import { Label, BoardFilters as BoardFiltersType } from "types";
import ChangeHandler from "./ChangeHandler";

interface BoardFiltersProps {
  onChange: (filters: BoardFiltersType) => void;
}

const BoardFilters: React.FC<BoardFiltersProps> = ({ onChange }) => {
  const board = useContext(BoardContext);
  const { boardLabels, boardReactions } = board || {};

  const handleSubmit = (values: BoardFiltersType) => {
    onChange(values);
  };

  return (
    <Box className="BoardFilters">
      <Formik
        initialValues={{ labels: [], reactions: [], authors: [] }}
        onSubmit={handleSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <Box>
                <MultipleChoice
                  label="Labels"
                  name="labels"
                  options={
                    !boardLabels
                      ? []
                      : boardLabels.map((l: Label) => ({
                          value: l.uid,
                          label: l.name,
                        }))
                  }
                />
              </Box>
              <Box>
                <MultipleChoice
                  label="Reactions"
                  name="reactions"
                  options={
                    !boardReactions
                      ? []
                      : boardReactions.map((l: Label) => ({
                          value: l.uid,
                          label: l.name,
                        }))
                  }
                />
                <ChangeHandler />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default BoardFilters;
