import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../../firebase";
import { useDebounceAsync } from "../../../customHooks";
import { Loader } from "react-feather";

import { TextInput } from "..";
import { useField } from "formik";

import { Box } from "@material-ui/core";
import LinkPreview from "../../LinkPerview";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    loader: {},
  });
});

interface LinkInputProps {
  name: string;
  label: string;
}

const VALID_URL_REGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const YOUTUBE_REGEX = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/;
const VIMEO_REGEX = /^(http:\/\/|https:\/\/)(vimeo\.com)\/([\w\/]+)([\?].*)?$/;
const IMAGE_LINK_REGEX = /(http(s?):)|([/|.|\w|\s])*\.(?:jpg|gif|png)/;

const matchesYoutube = (url: string): boolean => YOUTUBE_REGEX.test(url);
const matchesVimeo = (url: string): boolean => VIMEO_REGEX.test(url);
const matchesImage = (url: string): boolean => IMAGE_LINK_REGEX.test(url);

const LinkInput: React.FC<LinkInputProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const [metaLoading, setMetaLoading] = useState<boolean>(false);
  const firebase = useContext(FirebaseContext);

  const previewUrl = (url: string) =>
    firebase.functions.httpsCallable("previewUrl")({ url });
  const usePreviewUrl = () => useDebounceAsync((url) => previewUrl(url), 500);

  const { setInputText, searchResults } = usePreviewUrl();

  useEffect(() => {
    if (!!searchResults.loading) {
      setMetaLoading(true);
    } else {
      setMetaLoading(false);
    }
    if (
      searchResults?.result?.data &&
      field.value?.metadata?.title !== searchResults?.result?.data?.title
    ) {
      helpers.setValue({ ...field.value, metadata: searchResults.result.data });
    }
  }, [searchResults]);

  const handleChange = (e: any) => {
    setInputText(e.target.value);
    helpers.setValue({ url: e.target.value });
  };

  const handleImageMeasure = (ratio: number) => {
    helpers.setValue({
      ...field.value,
      metadata: { ...field.value.metadata, imageRatio: ratio },
    });
  };

  return (
    <Box>
      <Box display="flex">
        <Box flexGrow={1}>
          <TextInput
            label={label}
            name={name}
            value={field.value.url}
            onChange={handleChange}
            fullWidth
          />
        </Box>
        <Box width="50px">{metaLoading && <Loader size={20} />}</Box>
      </Box>
      {searchResults &&
        searchResults.status === "success" &&
        searchResults.result &&
        searchResults.result.data && (
          <LinkPreview
            data={searchResults.result.data}
            onImageMeasure={handleImageMeasure}
          />
        )}
    </Box>
  );
};

export default LinkInput;
