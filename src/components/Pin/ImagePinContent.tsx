import React, { useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {},
  });
});

interface ImagePinContentProps {
  url: string;
  alt: string;
}

const ImagePinContent: React.FC<ImagePinContentProps> = ({ url, alt }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pin}>
      <img src={url} alt={alt} />
    </Box>
  );
};

export default ImagePinContent;
