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
          <Box
            py={1}
            px={2}
            display="flex"
            width="100vw"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            <LogoutButton />
          </Box>
          {children}
        </MuiAppBar>
      )}
    </Measure>
  );
};

export default AppBar;
