import React from "react";
import { Box, BoxProps, TypographyProps, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    labelText: {
      color: theme.palette.text.secondary,
      marginBottom: "4px",
    },
  });
});

interface IProps {
  label: string;
  boxProps?: BoxProps;
  textProps?: TypographyProps;
}

const LabeledItem: React.FC<IProps> = ({
  label,
  children,
  boxProps,
  textProps,
}) => {
  const classes = useStyles();
  return (
    <Box my={1} {...boxProps}>
      <Typography variant="body2" className={classes.labelText}>
        {label}
      </Typography>
      {typeof children === "string" || typeof children === "number" ? (
        <Typography variant="body1" {...textProps}>
          {children}
        </Typography>
      ) : (
        children
      )}
    </Box>
  );
};

export default LabeledItem;
