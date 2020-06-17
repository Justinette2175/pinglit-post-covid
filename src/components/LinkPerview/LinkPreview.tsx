import React, { useRef } from "react";
import { LinkPreview as LinkPreviewType } from "../../types";
import { Box, Typography } from "@material-ui/core";

const PIN_WIDTH = 300;

interface LinkPreviewProps {
  data: LinkPreviewType;
  onImageMeasure?: (ratio: number) => void;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ data, onImageMeasure }) => {
  const imageRef = useRef();

  const handleImageLoad = () => {
    const domNode: any = imageRef.current;
    if (domNode && onImageMeasure) {
      const height: number = domNode.offsetHeight;
      const width: number = domNode.offsetWidth;
      if (height && width) {
        onImageMeasure(height / width);
      }
    }
  };

  return (
    <Box style={{ maxWidth: "350px" }}>
      {data.image && (
        <img
          width={`${PIN_WIDTH}px`}
          height={data.imageRatio ? `${PIN_WIDTH * data.imageRatio}px` : "auto"}
          ref={imageRef}
          onLoad={handleImageLoad}
          style={{ width: "100%" }}
          src={data.image}
        ></img>
      )}
      <Box>
        {data.siteName && (
          <Typography variant="caption">{data.siteName}</Typography>
        )}
        {data.title && <Typography>{data.title}</Typography>}
      </Box>
    </Box>
  );
};

export default LinkPreview;
