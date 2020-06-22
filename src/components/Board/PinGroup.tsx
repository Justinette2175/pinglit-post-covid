import React from "react";
import Quote from "../Text/Quote";

import { PinGroup, Pin as PinType } from "../../types";
import Pin from "../Pin";
import { Box, Typography, Card, CardActionArea } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clx from "classnames";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pinGroup: {
      paddingTop: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
    },
    multiPin: {
      marginBottom: theme.spacing(1),
    },
  });
});

interface PinGroupHeaderProps {
  pinGroup: PinGroup;
  onPinClick: (p: PinType) => void;
}

const PinGroupHeader: React.FC<PinGroupHeaderProps> = ({
  pinGroup,
  onPinClick,
}) => {
  const classes = useStyles();

  return (
    <Box className={clx(classes.pinGroup)}>
      <Box mb={2} px={2}>
        <Typography variant="caption">{pinGroup.percentage}%</Typography>
        <Quote text={pinGroup.referenceQuote} />
      </Box>
      {pinGroup.pins.map((pin, i) => (
        <Box className={classes.multiPin}>
          <Card elevation={0}>
            <CardActionArea onClick={() => onPinClick(pin)}>
              <Pin key={`${pinGroup.referenceQuoteId}-${i}`} data={pin} />
            </CardActionArea>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default PinGroupHeader;
