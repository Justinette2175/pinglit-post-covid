import React from "react";
import Measure from "react-measure";
import { AppBar as MuiAppBar, Toolbar, Box } from "@material-ui/core";
import LogoutButton from "../LogoutButton";

interface AppBarProps {
  onResize: (height: number) => void;
}

const AppBar: React.FC<AppBarProps> = ({ children, onResize }) => {
  return (
    <Measure
      bounds
      onResize={(contentRect: any) => {
        onResize(contentRect?.bounds?.height);
      }}
    >
      {({ measureRef }) => (
        <MuiAppBar ref={measureRef} color="default" position="fixed">
          <Toolbar>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box flexGrow={1}>{children}</Box>
              <LogoutButton />
            </Box>
          </Toolbar>
        </MuiAppBar>
      )}
    </Measure>
  );
};

export default AppBar;
