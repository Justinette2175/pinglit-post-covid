import React from "react";

import { PinGroup } from "../../types";
import Pin from "../Pin";
import { Box, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pinGroup: {
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(2),
    },
    multiPin: {
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      marginBottom: theme.spacing(1),
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    },
  });
});

interface PinGroupHeaderProps {
  pinGroup: PinGroup;
}

const PinGroupHeader: React.FC<PinGroupHeaderProps> = ({ pinGroup }) => {
  const classes = useStyles();
  return (
    <Box className={classes.pinGroup}>
      <Box mb={2}>
        <Typography variant="caption">{pinGroup.percentage}%</Typography>
        <Typography variant="body2">{pinGroup.referenceQuote}</Typography>
      </Box>
      {pinGroup.pins.length > 1 ? (
        pinGroup.pins.map((pin, i) => (
          <Box className={classes.multiPin}>
            <Pin key={`${pinGroup.referenceQuoteId}-${i}`} data={pin} />
          </Box>
        ))
      ) : (
        <Pin key={`${pinGroup.referenceQuoteId}`} data={pinGroup.pins[0]} />
      )}
    </Box>
  );
};

export default PinGroupHeader;
