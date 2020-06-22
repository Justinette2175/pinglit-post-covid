import React, { useContext } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardActionArea,
} from "@material-ui/core";
import { Pin as PinType, Content } from "../../types";
import { User, MessageSquare } from "react-feather";

import ImagePinContent from "./ImagePinContent";
import TextPinContent from "./TextPinContent";
import VideoPinContent from "./VideoPinContent";

import { isArray } from "util";
import LinkPreview from "components/LinkPerview";

interface PinProps {
  data: PinType;
}

const Pin: React.FC<PinProps> = ({ data }) => {
  const getContentMarkup = (content: Content, index: number) => {
    const typedContent: any = content;
    const key = `${data.uid}-content-${index}`;
    switch (typedContent.type) {
      case "LINK":
        return <LinkPreview data={typedContent.metadata} />;
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

  return (
    <Box py={0.5}>
      <Box>
        {isArray(data.content) &&
          data.content.map((c, i) => getContentMarkup(c, i))}
      </Box>
      <Box display="flex" justifyContent="space-between" px={2}>
        <Typography variant="caption">
          <User size={14} />
          {data.createdBy?.username}
        </Typography>
        <Box>
          <Typography variant="caption">
            <MessageSquare size={14} />
            {data.commentsCount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Pin;
