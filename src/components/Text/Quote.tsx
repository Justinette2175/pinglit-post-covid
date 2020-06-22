import React from "react";
import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    quote: {
      fontStyle: "italic",
      opacity: 0.8,
    },
  });
});

interface QuoteProps {
  text: string;
}

const Quote: React.FC<QuoteProps> = ({ text }) => {
  const classes = useStyles();
  return <Typography className={classes.quote}>{text}</Typography>;
};

export default Quote;
