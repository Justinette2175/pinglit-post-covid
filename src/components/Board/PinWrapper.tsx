import React, { useState, useEffect, useRef } from "react";
import clx from "classnames";
import { Pin as PinType, PinDimension } from "../../types";
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
      "&.positioned": {
        opacity: 1,
      },
    },
  });
});

interface PinProps {
  pin: PinType;
  onDimensions: (pos: PinDimension) => void;
  top: number;
  left: number;
  width: number;
}

const PinWrapper: React.FC<PinProps> = ({
  pin,
  onDimensions,
  left,
  top,
  width,
}) => {
  const element = useRef<HTMLDivElement>(null);
  const classes = usePinStyles({ width });

  const [{ currentTop, currentLeft }, setCurrent] = useState<{
    currentTop: number;
    currentLeft: number;
  }>({ currentTop: null, currentLeft: null });

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
      style={{
        top: currentTop,
        left: currentLeft,
      }}
      ref={element}
    >
      <Pin data={pin} />
    </div>
  );
};

export default PinWrapper;
