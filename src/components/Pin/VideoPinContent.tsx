import React, { useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {},
  });
});

interface VideoPinContentProps {
  url: string;
}

const VideoPinContent: React.FC<VideoPinContentProps> = ({ url }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pin}>
      <video src={url}></video>
    </Box>
  );
};

export default VideoPinContent;
