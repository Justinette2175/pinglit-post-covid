import React from "react";
import { Typography, Button, Box, Grid, Divider } from "@material-ui/core";
import { NumberInput, Select } from "../inputs";
import { Settings, BookOpen, Bookmark } from "react-feather";

import { Resource } from "../../types";
import ResourcePreview from "../ResourcePreview";

interface ReviewBoardInfoProps {
  resource: Resource;
  onEditResource: () => void;
}

const ReviewBoardInfo: React.FC<ReviewBoardInfoProps> = ({
  resource,
  onEditResource,
}) => {
  return (
    <>
      <Box>
        <Typography variant="h2">Review</Typography>
        <Typography variant="h3">
          <Settings size="14" style={{ marginRight: "8px" }} />
          Board settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Select
              label="Unit"
              name="unit"
              options={[{ label: "Page", value: "p." }]}
            />
          </Grid>
          <Grid item>
            <Select
              label="Type"
              name="unitType"
              options={[{ label: "Integer", value: "INTEGER" }]}
            ></Select>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h3">
          <BookOpen size="14" style={{ marginRight: "8px" }} />
          Board Information
        </Typography>
        <ResourcePreview resource={resource} />
        <Button onClick={onEditResource}>Edit</Button>
      </Box>
      <Divider />
      <Box>
        <Typography variant="h3">
          <Bookmark size="14" style={{ marginRight: "8px" }} />
          Pages
        </Typography>
        <Typography>
          If you'd like to annotate the book with other people with different
          editions, find the first and last page of the book.
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <NumberInput name="startStep" label="First page" />
          </Grid>
          <Grid item>
            <NumberInput name="endStep" label="Last page" />
          </Grid>
        </Grid>
        <Button type="submit" color="primary" variant="contained">
          Create board
        </Button>
      </Box>
    </>
  );
};

export default ReviewBoardInfo;
