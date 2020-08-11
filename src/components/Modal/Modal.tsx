import React from "react";
import { Dialog, DialogProps, Box } from "@material-ui/core";

const Modal: React.FC<DialogProps> = ({
  onClose,
  open,
  children,
  maxWidth,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth || "md"}>
      <Box p={4}>{children}</Box>
    </Dialog>
  );
};

export default Modal;
