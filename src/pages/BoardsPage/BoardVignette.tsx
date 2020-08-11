import React from "react";
import { Link } from "react-router-dom";

import { Board } from "../../types";
import { Card, Typography, Box } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    boardVignetteCard: {
      maxWidth: "400px",
    },
  });
});

interface BoardVignetteProps {
  board: Board;
}

const BoardVignette: React.FC<BoardVignetteProps> = ({
  board: { uid, resource, members, pinCount },
}) => {
  const classes = useStyles();
  return (
    <Link to={`/boards/${uid}`} style={{ textDecoration: "none" }}>
      <Card elevation={0} className={classes.boardVignetteCard}>
        {resource && (
          <Box display="flex">
            {resource.image && (
              <Box mb={"-6px"}>
                <img src={resource.image} />
              </Box>
            )}
            <Box p={2}>
              <Typography variant="h3">{resource.title}</Typography>
              {resource.author && (
                <Typography variant="h4">{resource.author}</Typography>
              )}
              {members && (
                <Typography>{`${
                  Object.keys(members).length
                } members`}</Typography>
              )}
              <Typography>{`${pinCount} pins`}</Typography>
            </Box>
          </Box>
        )}
      </Card>
    </Link>
  );
};

export default BoardVignette;
