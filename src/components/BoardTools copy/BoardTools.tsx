import React, { useState } from "react";
import { Typography, IconButton, Box, Dialog } from "@material-ui/core";
import { Board } from "../../types";
import { PlusSquare } from "react-feather";
import CreatePin from "../CreatePin";

interface BoardToolsProps {
  boardId: string;
}

const BoardTools: React.FC<BoardToolsProps> = ({ boardId }) => {
  const [createPinVisible, setCreatePinVisible] = useState<boolean>(false);

  const handleCreatePin = () => {
    setCreatePinVisible(true);
  };

  const handleCloseCreatePin = () => {
    setCreatePinVisible(false);
  };

  return (
    <>
      <Box display="flex" bgcolor="background.paper" width="100%" px={2} py={1}>
        <Box display="flex">
          <IconButton onClick={handleCreatePin}>
            <PlusSquare size={20} />
          </IconButton>
        </Box>
      </Box>
      <Dialog open={createPinVisible} onClose={handleCloseCreatePin}>
        <CreatePin boardId={boardId} onClose={handleCloseCreatePin} />
      </Dialog>
    </>
  );
};

export default BoardTools;
