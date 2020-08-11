import React from "react";
import { Resource } from "../../types";
import { Box, Typography } from "@material-ui/core";

interface ResourcePreviewProps {
  resource: Resource;
}

const ResourcePreview: React.FC<ResourcePreviewProps> = ({ resource }) => {
  return (
    <Box display="flex" alignItems="flex-start">
      {resource.image && (
        <Box mr={2}>
          <img width="100px" src={resource.image} />
        </Box>
      )}
      <Box>
        <Typography>{resource.title}</Typography>
        {resource.author && <Typography>{resource.author}</Typography>}
        {resource.publisher && <Typography>{resource.publisher}</Typography>}
        {resource.publishedDate && (
          <Typography>{resource.publishedDate}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ResourcePreview;
