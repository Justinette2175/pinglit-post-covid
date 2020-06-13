import React, { useContext } from "react";
import { Button, Box, Typography } from "@material-ui/core";
import { Pin as PinType, Content } from "../../types";
import { User, MessageSquare } from "react-feather";

import ImagePinContent from "./ImagePinContent";
import TextPinContent from "./TextPinContent";
import VideoPinContent from "./VideoPinContent";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { isArray } from "util";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    pin: {},
  });
});

interface PinProps {
  data: PinType;
}

const Pin: React.FC<PinProps> = ({ data }) => {
  const getContentMarkup = (content: Content, index: number) => {
    const typedContent: any = content;
    const key = `${data.uid}-content-${index}`;
    switch (typedContent.type) {
      case "IMAGE":
        return (
          <ImagePinContent
            key={key}
            url={typedContent.url}
            alt={typedContent.alt}
          />
        );
      case "TEXT":
        return <TextPinContent key={key} text={typedContent.text} />;
      case "VIDEO":
        return <TextPinContent key={key} text={typedContent.text} />;
    }
  };

  const classes = useStyles();
  return (
    <Box className={classes.pin}>
      <Typography>p.{data.location?.stepValue}</Typography>
      <Typography>{data.referenceQuote}</Typography>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>
            <User size={14} />
            {data.createdBy?.username}
          </Typography>
          <Box>
            <Typography>
              <MessageSquare size={14} />
              {data.commentsCount}
            </Typography>
          </Box>
        </Box>
        {isArray(data.content) &&
          data.content.map((c, i) => getContentMarkup(c, i))}
      </Box>
    </Box>
  );
};

export default Pin;
