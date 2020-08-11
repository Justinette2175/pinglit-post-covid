import React, { useState } from "react";
import { TextField, useTheme } from "@material-ui/core";
import { Box, List, ListItem, ListItemText } from "@material-ui/core";
import fetch from "isomorphic-fetch";
import { Resource } from "../../types";
import useDebouncedSearch from "./useDebouncedSearch";

import ResourcePreview from "../ResourcePreview";

interface IProps {
  onBookSelect: (volume: any) => void;
  value?: any;
}

const fetchInGoogleBooks = async (text: any) => {
  const query = text.split(" ").join("+");
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  return res.json();
};

const SearchBar: React.FC<IProps> = ({ onBookSelect, value }) => {
  const useGoogleBooksSearch = () =>
    useDebouncedSearch((text) => fetchInGoogleBooks(text));

  const { inputText, setInputText, searchResults } = useGoogleBooksSearch();

  const getBooks = (): Array<Resource> => {
    if (
      searchResults &&
      searchResults.status === "success" &&
      searchResults.result &&
      searchResults.result.items &&
      searchResults.result.items.length > 0
    ) {
      const items = searchResults.result.items;
      return items.map((r: any) => {
        const info = r.volumeInfo;
        const authors = info && info.authors ? info.authors.join(", ") : "";
        const imageLink =
          info && !!info.imageLinks ? info.imageLinks.thumbnail : null;
        return {
          publisher: info.publisher,
          publishedDate: info.publishedDate,
          author: authors,
          title: info.title,
          image: imageLink,
          googleId: r.id,
          description: info.description,
        };
      });
    }
  };

  const books = getBooks() || [];

  const theme = useTheme();

  return (
    <>
      <Box position="relative">
        <TextField
          fullWidth
          margin="none"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          label="Enter the book title or author"
        />
        <Box
          position="static"
          overflow="auto"
          height={books.length > 0 ? "300px" : 0}
          maxHeight="300px"
          width={"100%"}
          style={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            transition: "0.25s",
            border: `${books.length > 0 ? 1 : 0}px solid ${
              theme.palette.divider
            }`,
          }}
        >
          <List>
            {books.map((b: Resource, i: number) => (
              <ListItem
                divider
                key={`book-search-${i}`}
                dense
                button
                onClick={() => onBookSelect(b)}
              >
                <ResourcePreview resource={b} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default SearchBar;
