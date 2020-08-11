import React, { useState, useEffect } from "react";

import { PinGroup as PinGroupType, PinDimension, Pin } from "../../types";
import { Box, IconButton } from "@material-ui/core";
import PinGroupWrapper from "./PinGroupWrapper";
import PinGroup from "./PinGroup";
import FocusPin from "components/FocusPin";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import zIndex from "@material-ui/core/styles/zIndex";
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    board: {
      backgroundColor: theme.palette.primary.main,
    },
    boardBg: {
      backgroundColor: theme.palette.primary.main,
      height: "100vh",
      width: "100vw",
      zIndex: 0,
      position: "fixed",
    },
  });
});

const CARD_WIDTH = 300;

interface BoardProps {
  boardId: string;
  firstStep?: number;
  lastStep?: number;
  pinsGroups: Array<PinGroupType>;
  numberOfColumns: number;
  pinSteps: Array<number | string>;
}

type Interval = Array<number>;

const Board: React.FC<BoardProps> = ({
  pinsGroups,
  firstStep = 0,
  lastStep = 100,
  numberOfColumns,
}) => {
  const [pinWidth, setPinWidth] = useState<number>(CARD_WIDTH);
  const [intervals, setIntervals] = useState<Array<Interval>>([]);
  const [pinPositions, setPinPositions] = useState<{
    [pinId: string]: PinDimension;
  }>({});
  const [focusedPin, setFocusedPin] = useState<Pin>(null);

  const makeIntervals = async () => {
    const distance = lastStep - firstStep + 1;
    const intervalDistance = distance / numberOfColumns;
    const intervals = Array.apply(null, Array(numberOfColumns)).map((_, i) => {
      const first = firstStep - 1 + intervalDistance * i;
      const last = firstStep - 1 + intervalDistance * (i + 1);
      return [first, last];
    });
    setIntervals(intervals);
  };

  useEffect(() => {
    makeIntervals();
  }, [numberOfColumns]);

  const handleNewPinDimensions = (pinId: string, dimensions: PinDimension) => {
    setPinPositions((current: { [pinId: string]: PinDimension }) => {
      const newPositions = Object.assign({}, current, {
        [pinId]: { ...current[pinId], ...dimensions },
      });
      return newPositions;
    });
  };

  const getPinInterval = (
    percentage: number,
    isLast: boolean
  ): { interval: Interval; index: number } => {
    if (!intervals || intervals.length < numberOfColumns) {
      return null;
    }
    let myInt: { interval: Interval; index: number } = null;
    intervals.some((int, i) => {
      const isMyInt =
        int[0] <= percentage &&
        (int[1] > percentage || (isLast && int[1] >= percentage));
      if (isMyInt) {
        myInt = { interval: int, index: i };
      }
      return isMyInt;
    });
    return myInt;
  };

  const getPinPosition = (
    pin: PinGroupType,
    previousPin: PinGroupType,
    isLast: boolean
  ): { top: number; left: number } => {
    const percentage = pin.percentage;
    const pinInterval = getPinInterval(percentage, isLast);
    let left = null,
      top = null;
    if (pinInterval) {
      left = pinInterval.index * pinWidth;
      const previousPinPosition = previousPin
        ? pinPositions[previousPin.uid]
        : null;
      if (!previousPin) {
        top = 0;
      } else if (
        previousPinPosition &&
        previousPin.percentage >= pinInterval.interval[0] &&
        (previousPinPosition.top || previousPinPosition.top === 0) &&
        (previousPinPosition.height || previousPinPosition.height === 0)
      ) {
        top = previousPinPosition.height + previousPinPosition.top;
      } else if (previousPin.percentage < pinInterval.interval[0]) {
        top = 0;
      }
    }
    return { top, left };
  };

  const classes = useStyles();

  return (
    <>
      <Box className={classes.boardBg}></Box>
      <Box position="relative">
        {pinsGroups.map((p, i, arr) => {
          const isLast = i === arr.length - 1;
          const pinPosition = getPinPosition(p, arr[i - 1], isLast);
          return (
            <PinGroupWrapper
              width={pinWidth}
              key={`pin-${i}`}
              pinGroup={p}
              onDimensions={(dimensions: PinDimension) =>
                handleNewPinDimensions(p.uid, dimensions)
              }
              top={pinPosition.top}
              left={pinPosition.left}
            >
              <PinGroup pinGroup={p} onPinClick={(p) => setFocusedPin(p)} />
            </PinGroupWrapper>
          );
        })}
      </Box>
      <FocusPin
        pin={focusedPin}
        open={!!focusedPin}
        onClose={() => setFocusedPin(null)}
      />
    </>
  );
};

export default Board;
