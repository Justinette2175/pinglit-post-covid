import React, { useState, useEffect, useRef } from "react";
import clx from "classnames";
import Measure from "react-measure";
import { PinGroup as PinGroupType, PinDimension } from "../../types";
import { Box } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import PinGroup from "./PinGroup";

const usePinStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {
      width: ({ width }: any) => width,
      position: "absolute",
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      opacity: 0,
      transition: ".5s",
      transform: ({ currentLeft, currentTop }: any) =>
        `translate(${currentLeft}px, ${currentTop}px)`,
      "&.positioned": {
        opacity: 1,
      },
    },
    measure: {
      paddingBottom: theme.spacing(0.5),
    },
  });
});

interface PinProps {
  pinGroup: PinGroupType;
  onDimensions: (pos: PinDimension) => void;
  top: number;
  left: number;
  width: number;
}

const PinGroupWrapper: React.FC<PinProps> = ({
  pinGroup,
  children,
  onDimensions,
  left,
  top,
  width,
}) => {
  const element = useRef<HTMLDivElement>(null);

  const [{ currentTop, currentLeft }, setCurrent] = useState<{
    currentTop: number;
    currentLeft: number;
  }>({ currentTop: null, currentLeft: null });

  const classes = usePinStyles({ width, currentLeft, currentTop });

  useEffect(() => {
    if ((left || left === 0) && (top || top === 0)) {
      onDimensions({ left, top });
      setCurrent({ currentTop: top, currentLeft: left });
    }
  }, [left, top]);

  return (
    <div
      className={clx(classes.pin, {
        positioned:
          (currentTop || currentTop === 0) &&
          (currentLeft || currentLeft === 0),
      })}
      ref={element}
    >
      <Measure
        bounds
        onResize={(contentRect: any) => {
          onDimensions({ height: contentRect?.bounds?.height });
        }}
      >
        {({ measureRef }) => (
          <div className={classes.measure} ref={measureRef}>
            {children}
          </div>
        )}
      </Measure>
    </div>
  );
};

export default PinGroupWrapper;
