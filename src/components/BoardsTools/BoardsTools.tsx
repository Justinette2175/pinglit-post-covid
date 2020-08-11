import React, { useState } from "react";
import { Typography, IconButton, Box, Dialog } from "@material-ui/core";
import { Board } from "../../types";
import { PlusSquare } from "react-feather";
import CreateBoard from "components/CreateBoard";
import Modal from "../Modal";

interface BoardsToolsProps {}

const BoardsTools: React.FC<BoardsToolsProps> = ({}) => {
  const [CreateBoardVisible, setCreateBoardVisible] = useState<boolean>(false);

  const handleCreateBoard = () => {
    setCreateBoardVisible(true);
  };

  const handleCloseCreateBoard = () => {
    setCreateBoardVisible(false);
  };

  return (
    <>
      <Box display="flex" bgcolor="background.paper" width="100%" px={2} py={1}>
        <Box display="flex">
          <IconButton onClick={handleCreateBoard}>
            <PlusSquare size={20} />
          </IconButton>
        </Box>
      </Box>
      <Modal open={CreateBoardVisible} onClose={handleCloseCreateBoard}>
        <CreateBoard onClose={handleCloseCreateBoard} />
      </Modal>
    </>
  );
};

export default BoardsTools;
