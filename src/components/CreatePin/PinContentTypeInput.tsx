import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import { Link2, Upload, AlignLeft, Italic } from "react-feather";

export type PinContentType = "LINK" | "UPLOAD" | "WORD" | "TEXT";

const PIN_TYPES: Array<{ type: PinContentType; icon: any }> = [
  {
    type: "TEXT",
    icon: AlignLeft,
  },
  {
    type: "LINK",
    icon: Link2,
  },
  {
    type: "UPLOAD",
    icon: Upload,
  },
  {
    type: "WORD",
    icon: Italic,
  },
];

interface PinContentTypeInputProps {
  onUpdate: (type: PinContentType) => void;
  value: PinContentType;
}

const PinContentTypeInput: React.FC<PinContentTypeInputProps> = ({
  onUpdate,
  value,
}) => {
  const makeButtons = () =>
    PIN_TYPES.map((type) => {
      return (
        <Grid item>
          <IconButton
            onClick={() => onUpdate(type.type)}
            color={value === type.type ? "primary" : "default"}
          >
            <type.icon size={13} />
          </IconButton>
        </Grid>
      );
    });
  return <Grid container>{makeButtons()}</Grid>;
};

export default PinContentTypeInput;
