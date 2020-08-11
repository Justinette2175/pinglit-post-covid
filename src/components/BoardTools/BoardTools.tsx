import React, { useState } from "react";
import { IconButton, Box, Dialog, Button } from "@material-ui/core";
import { PlusSquare, UserPlus, Filter } from "react-feather";
import CreatePin from "components/CreatePin";
import UpdateBoardPermissions from "components/UpdateBoardPermissions";
import { ZoomIn, ZoomOut } from "react-feather";
import Modal from "../Modal";

interface BoardToolsProps {
  openMenu: () => void;
  handleZoom: (direction: "IN" | "OUT") => void;
}

const BoardTools: React.FC<BoardToolsProps> = ({ openMenu, handleZoom }) => {
  const [createPinVisible, setCreatePinVisible] = useState<boolean>(false);
  const [addMemberVisible, setAddMemberVisible] = useState<boolean>(false);

  return (
    <>
      <Box display="flex" width="100vw" justifyContent="space-between" px={2}>
        <Box display="flex">
          <IconButton onClick={() => setCreatePinVisible(true)}>
            <PlusSquare size={20} />
          </IconButton>
          <IconButton onClick={() => setAddMemberVisible(true)}>
            <UserPlus size={20} />
          </IconButton>
        </Box>
        <Box>
          <Box ml={2}>
            <IconButton onClick={() => handleZoom("IN")}>
              <ZoomIn size={20} />
            </IconButton>
            <IconButton onClick={() => handleZoom("OUT")}>
              <ZoomOut size={20} />
            </IconButton>
          </Box>
          <Button color="primary" startIcon={<Filter />} onClick={openMenu}>
            Filters
          </Button>
        </Box>
      </Box>
      <Modal open={createPinVisible} onClose={() => setCreatePinVisible(false)}>
        <CreatePin onClose={() => setCreatePinVisible(false)} />
      </Modal>
      <Modal open={addMemberVisible} onClose={() => setAddMemberVisible(false)}>
        <UpdateBoardPermissions />
      </Modal>
    </>
  );
};

export default BoardTools;
