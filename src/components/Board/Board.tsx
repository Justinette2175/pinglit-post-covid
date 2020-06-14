import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { ZoomIn, ZoomOut } from "react-feather";

import { Board as BoardType, Pin as PinType, PinDimension } from "../../types";
import { Box, IconButton } from "@material-ui/core";
import Pin from "./PinWrapper";
import { BoardTools } from "..";

const CARD_WIDTH = 350;

interface BoardProps {
  boardId: string;
}

type Interval = Array<number>;

const Board: React.FC<BoardProps> = ({ boardId }) => {
  const [pinWidth, setPinWidth] = useState<number>(CARD_WIDTH);
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [board, setBoard] = useState<BoardType>(null);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(4);
  const [intervals, setIntervals] = useState<Array<Interval>>([]);
  const [pins, setPins] = useState<Array<PinType>>([]);
  const [pinPositions, setPinPositions] = useState<{
    [pinId: string]: PinDimension;
  }>({});

  const getFirstOrLastStep = async (
    which: "first" | "last"
  ): Promise<number> => {
    let pinSnapshot;
    if (which === "first") {
      pinSnapshot = await firebase.firestore
        .collection("pins")
        .where("boardId", "==", boardId)
        .orderBy("location.percentage")
        .limit(1)
        .get();
    } else {
      pinSnapshot = await firebase.firestore
        .collection("pins")
        .where("boardId", "==", boardId)
        .orderBy("location.percentage", "desc")
        .limit(1)
        .get();
    }
    let step;
    pinSnapshot.forEach((p: any) => (step = p.data().location.percentage));
    return step;
  };

  const makeIntervals = async () => {
    const firstStep = await getFirstOrLastStep("first");
    const lastStep = await getFirstOrLastStep("last");
    const distance = lastStep - firstStep + 1;
    const intervalDistance = distance / numberOfColumns;
    const intervals = Array.apply(null, Array(numberOfColumns)).map((_, i) => {
      const first = firstStep - 1 + intervalDistance * i;
      const last = firstStep - 1 + intervalDistance * (i + 1);
      return [first, last];
    });
    setIntervals(intervals);
  };

  const fetchPins = (): any => {
    return firebase.firestore
      .collection("pins")
      .where("boardId", "==", boardId)
      .orderBy("location.percentage")
      .onSnapshot((snapshot: any) => {
        const newPins: Array<PinType> = [];
        snapshot.forEach((snap: any) => {
          console.log("new pin fetched", snap.data());
          newPins.push({ uid: snap.id, ...snap.data() });
        });
        setPins(newPins);
      });
  };

  useEffect(() => {
    const unsubscribe = fetchPins();
    return unsubscribe;
  }, []);

  useEffect(() => {
    makeIntervals();
  }, [numberOfColumns]);

  const handleZoomIn = () => {
    setNumberOfColumns(numberOfColumns + 1);
  };

  const handleZoomOut = () => {
    const newNumberOfColumns = numberOfColumns - 1;
    if (newNumberOfColumns > 0) {
      setNumberOfColumns(newNumberOfColumns);
    }
  };

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
    pin: PinType,
    previousPin: PinType,
    isLast: boolean
  ): { top: number; left: number } => {
    const percentage = pin.location.percentage;
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
        previousPin.location.percentage >= pinInterval.interval[0] &&
        (previousPinPosition.top || previousPinPosition.top === 0) &&
        (previousPinPosition.height || previousPinPosition.height === 0)
      ) {
        top = previousPinPosition.height + previousPinPosition.top;
      } else if (previousPin.location.percentage < pinInterval.interval[0]) {
        top = 0;
      }
    }
    return { top, left };
  };

  return (
    <>
      <BoardTools boardId={boardId} />
      <Box ml={2}>
        <IconButton onClick={handleZoomIn}>
          <ZoomIn size={20} />
        </IconButton>
        <IconButton onClick={handleZoomOut}>
          <ZoomOut size={20} />
        </IconButton>
      </Box>
      <Box position="relative">
        {pins.map((p, i, arr) => {
          const isLast = i === arr.length - 1;
          const pinPosition = getPinPosition(p, arr[i - 1], isLast);
          return (
            <Pin
              width={pinWidth}
              key={`pin-${i}`}
              pin={p}
              onDimensions={(dimensions: PinDimension) =>
                handleNewPinDimensions(p.uid, dimensions)
              }
              top={pinPosition.top}
              left={pinPosition.left}
            />
          );
        })}
      </Box>
    </>
  );
};

export default Board;
