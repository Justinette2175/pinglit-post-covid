import React, { useState } from "react";
import { IconButton, Box, Dialog } from "@material-ui/core";
import { PlusSquare, UserPlus } from "react-feather";
import CreatePin from "components/CreatePin";
import UpdateBoardPermissions from "components/UpdateBoardPermissions";

interface BoardToolsProps {
  boardId: string;
}

const BoardTools: React.FC<BoardToolsProps> = ({ boardId }) => {
  const [createPinVisible, setCreatePinVisible] = useState<boolean>(false);
  const [addMemberVisible, setAddMemberVisible] = useState<boolean>(false);

  return (
    <>
      <Box display="flex" bgcolor="background.paper" width="100%" px={2} py={1}>
        <Box display="flex">
          <IconButton onClick={() => setCreatePinVisible(true)}>
            <PlusSquare size={20} />
          </IconButton>
          <IconButton onClick={() => setAddMemberVisible(true)}>
            <UserPlus size={20} />
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={createPinVisible}
        onClose={() => setCreatePinVisible(false)}
      >
        <CreatePin onClose={() => setCreatePinVisible(false)} />
      </Dialog>
      <Dialog
        open={addMemberVisible}
        onClose={() => setAddMemberVisible(false)}
      >
        <UpdateBoardPermissions />
      </Dialog>
    </>
  );
};

export default BoardTools;
