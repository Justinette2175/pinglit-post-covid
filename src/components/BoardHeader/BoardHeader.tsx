import React from "react";
import { Typography, Box } from "@material-ui/core";
import { Board } from "../../types";

interface BoardHeaderProps {
  data: Board;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ data }) => {
  if (!data || !data.content) {
    return null;
  }
  return (
    <Box display="flex" bgcolor="background.paper" width="100%" p={4}>
      {data.content?.image && (
        <Box>
          <img src={data.content.image} />
        </Box>
      )}
      <Box>
        <Typography variant="h2">{data.content.title}</Typography>
        <Box>
          {data.owners &&
            Object.values(data.owners).map((val, i) => (
              <Typography variant="body1">{JSON.stringify(val)}</Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BoardHeader;
