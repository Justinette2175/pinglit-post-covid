import React from "react";
import { Drawer, Typography, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    drawer: {
      width: 300,
    },
  });
});

interface BoardSideMenuProps {
  open: boolean;
  onClose: () => void;
}

const BoardSideMenu: React.FC<BoardSideMenuProps> = ({ open, onClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      variant="persistent"
      open={open}
      onClose={onClose}
      PaperProps={{ className: classes.drawer }}
    >
      <Button onClick={onClose}>Close</Button>
      <Typography variant="h2">My menu</Typography>
    </Drawer>
  );
};

export default BoardSideMenu;
