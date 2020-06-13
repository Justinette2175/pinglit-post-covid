import React from "react";
import { Link } from "react-router-dom";

import { Board } from "../../types";
import { Card, Typography } from "@material-ui/core";

interface BoardVignetteProps {
  board: Board;
}

const BoardVignette: React.FC<BoardVignetteProps> = ({ board: { uid } }) => {
  return (
    <Link to={`/boards/${uid}`}>
      <Card>
        <Typography variant="body1">{uid}</Typography>
      </Card>
    </Link>
  );
};

export default BoardVignette;
