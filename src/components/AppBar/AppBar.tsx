import React from "react";

import { AppBar as MuiAppBar, Toolbar } from "@material-ui/core";
import LogoutButton from "../LogoutButton";

interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = () => {
  return (
    <MuiAppBar>
      <Toolbar>
        <LogoutButton />
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
