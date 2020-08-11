import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Board } from "../../types";

import { Grid, Box } from "@material-ui/core";
import BoardVignette from "./BoardVignette";
import { BoardsTools } from "../../components";

interface BoardsPageInterfaceProps {
  boards: Array<Board>;
}

const BoardsPageInterface: React.FC<BoardsPageInterfaceProps> = ({
  boards,
}) => {
  return (
    <>
      <BoardsTools />
      <Box display="flex" width="100vw" p={4}>
        {boards.map((b, i) =>
          b.resource ? (
            <Box mr={2}>
              <BoardVignette board={b} />
            </Box>
          ) : null
        )}
      </Box>
    </>
  );
};

export default BoardsPageInterface;
