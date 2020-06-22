import React from "react";

import { Dialog } from "@material-ui/core";
import { Pin as PinType } from "types";
import Pin from "../Pin";
import NewCommentForm from "./NewCommentForm";
import PinComments from "./PinComents";

interface FocusPinProps {
  open: boolean;
  onClose: () => void;
  pin: PinType;
}

const FocusPin: React.FC<FocusPinProps> = ({ open, onClose, pin }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {pin && (
        <>
          <Pin data={pin} />
          <PinComments
            pinId={pin.uid}
            permission={pin.commentPermission}
            pinCreatorId={pin.createdBy.userId}
          />
          <NewCommentForm pinId={pin.uid} />
        </>
      )}
    </Dialog>
  );
};

export default FocusPin;
