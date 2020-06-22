import React, { useContext, useState, useEffect, useRef } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext, BoardContext } from "../../contexts";

import { Board, BoardHeader } from "../../components";

import { Board as BoardType, Label, Reaction, BoardFilters } from "../../types";
import { Box } from "@material-ui/core";
import BoardSideMenu from "components/BoardSideMenu";

interface BoardPageProps {
  match: {
    params: {
      boardId: string;
    };
  };
}

const BoardPage: React.FC<BoardPageProps> = ({
  match: {
    params: { boardId },
  },
}) => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [board, setBoard] = useState<BoardType>(null);
  const [appbarHeight, setAppbarHeight] = useState<number>(0);
  const [numberOfColumns, setNumberOfColumns] = useState<number>(4);

  const [filters, setFilters] = useState<BoardFilters>({
    labels: [],
    reactions: [],
    authors: [],
  });

  const listenToBoard = () => {
    return firebase.firestore
      .collection("boards")
      .doc(boardId)
      .onSnapshot((doc: any) => {
        setBoard((board) => ({ ...board, uid: doc.id, ...doc.data() }));
      });
  };

  const listenToBoardLabels = () => {
    return firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("labels")
      .onSnapshot((snapshot: any) => {
        const newLabels: Array<Label> = [];
        snapshot.forEach((snap: any) => {
          newLabels.push({
            uid: snap.id,
            ...snap.data(),
          });
        });
        setBoard((board) => ({ ...board, boardLabels: newLabels }));
      });
  };

  const listenToBoardReactions = () => {
    return firebase.firestore
      .collection("boards")
      .doc(boardId)
      .collection("reactions")
      .onSnapshot((snapshot: any) => {
        const newReactions: Array<Reaction> = [];
        snapshot.forEach((snap: any) => {
          newReactions.push({
            uid: snap.id,
            ...snap.data(),
          });
        });
        setBoard((board) => ({ ...board, boardReactions: newReactions }));
      });
  };

  useEffect(() => {
    if (boardId && (!board || board.uid !== boardId)) {
      const unsubscribeFromBoard = listenToBoard();
      const unsubscribeFromBoardLabels = listenToBoardLabels();
      const unsubscribeFromBoardReactions = listenToBoardReactions();
      return () => {
        unsubscribeFromBoard();
        unsubscribeFromBoardLabels();
        unsubscribeFromBoardReactions();
      };
    }
  }, []);

  const handleAppbarHeight = (height: number) => {
    setAppbarHeight(height);
  };

  const handleZoom = (direction: "IN" | "OUT") => {
    if (direction === "IN") {
      setNumberOfColumns(numberOfColumns + 1);
    } else {
      const newNumberOfColumns = numberOfColumns - 1;
      if (newNumberOfColumns > 0) {
        setNumberOfColumns(newNumberOfColumns);
      }
    }
  };

  return (
    <BoardContext.Provider value={board}>
      <Box>
        <BoardHeader
          onFiltersChange={setFilters}
          onAppbarHeight={handleAppbarHeight}
          onMenuOpen={() => setMenuOpen(true)}
          handleZoom={handleZoom}
        />
        <Box width="100vw" position="relative" top={appbarHeight}>
          <Board numberOfColumns={numberOfColumns} filters={filters} />
        </Box>
        <BoardSideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      </Box>
    </BoardContext.Provider>
  );
};

export default BoardPage;
