import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Board } from "../../types";

import { Grid } from "@material-ui/core";
import BoardVignette from "./BoardVignette";
import { BoardsTools } from "../../components";

interface BoardsPageInterfaceProps {
  boards: Array<Board>;
}

const BoardsPageInterface: React.FC<BoardsPageInterfaceProps> = ({
  boards,
}) => {
  return (
    <Grid container spacing={2}>
      <BoardsTools />
      {boards.map((b, i) => (
        <Grid item key={`board-${i}`}>
          <BoardVignette board={b} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardsPageInterface;
