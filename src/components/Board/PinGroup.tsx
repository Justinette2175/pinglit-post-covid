import React, { useState, useEffect, useRef } from "react";
import clx from "classnames";
import { PinGroup as PinGroupType, PinDimension } from "../../types";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Pin from "../Pin";

const usePinStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {
      width: ({ width }: any) => width,
      position: "absolute",
      paddingBottom: "30px",
      paddingRight: "30px",
      opacity: 0,
      transition: ".5s",
      transform: ({ currentLeft, currentTop }: any) =>
        `translate(${currentLeft}px, ${currentTop}px)`,
      "&.positioned": {
        opacity: 1,
      },
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

const PinGroup: React.FC<PinProps> = ({
  pinGroup,
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
    if (element.current) {
      const height = element.current.offsetHeight;
      onDimensions({ height });
    }
  }, []);

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
      {pinGroup.pins.map((pin, i) => (
        <Pin key={`${pinGroup.referenceQuoteId}-${i}`} data={pin} />
      ))}
    </div>
  );
};

export default PinGroup;
