import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BoardContext } from "../../contexts";
import AppBar from "../AppBar";
import { Typography, Box, IconButton } from "@material-ui/core";
import { ArrowLeft } from "react-feather";
import { Board, BoardFilters as BoardFiltersType } from "../../types";
import BoardTools from "../BoardTools";

interface BoardHeaderProps {
  onFiltersChange: (filters: BoardFiltersType) => void;
  onAppbarHeight: (height: number) => void;
  onMenuOpen: () => void;
  handleZoom: (direction: "IN" | "OUT") => void;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({
  onFiltersChange,
  onAppbarHeight,
  onMenuOpen,
  handleZoom,
}) => {
  const board = useContext(BoardContext);
  if (!board || !board.content) {
    return null;
  }

  const handleFiltersChange = (filters: BoardFiltersType) => {
    onFiltersChange(filters);
  };

  return (
    <AppBar onResize={onAppbarHeight}>
      <Box display="flex" width="100%" py={2} alignItems="flex-start">
        <Box mr={2}>
          <IconButton
            component={Link}
            to="/boards"
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <ArrowLeft size={20} />
          </IconButton>
        </Box>
        <Box mt={1}>
          {board.content?.image && (
            <Box>
              <img src={board.content.image} />
            </Box>
          )}
          <Box>
            <Typography variant="h2">{board.content.title}</Typography>
          </Box>
        </Box>
      </Box>
      <BoardTools openMenu={onMenuOpen} handleZoom={handleZoom} />
    </AppBar>
  );
};

export default BoardHeader;
