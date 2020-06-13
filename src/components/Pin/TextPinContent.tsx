import React, { useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {},
  });
});

interface TextPinContentProps {
  text: string;
}

const TextPinContent: React.FC<TextPinContentProps> = ({ text }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pin}>
      <Typography>{text}</Typography>
    </Box>
  );
};

export default TextPinContent;
