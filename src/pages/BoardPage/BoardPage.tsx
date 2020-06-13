import React, { useContext, useState, useEffect, useRef } from "react";
import { FirebaseContext } from "../../firebase";

import { Board, BoardHeader } from "../../components";

import { Board as BoardType } from "../../types";
import { Box } from "@material-ui/core";

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
  const [board, setBoard] = useState<BoardType>(null);

  const unsubscribeFromBoard = useRef(null);

  const listenToBoard = () => {
    return firebase.firestore
      .collection("boards")
      .doc(boardId)
      .onSnapshot((doc: any) => {
        setBoard({ uid: doc.id, ...doc.data() });
      });
  };
  const unsubscribe = () => {
    if (unsubscribeFromBoard.current) {
      unsubscribeFromBoard.current();
    }
  };

  useEffect(() => {
    unsubscribeFromBoard.current = listenToBoard();
    return unsubscribe;
  }, []);

  return (
    <Box width="100vw">
      <BoardHeader data={board} />
      <Box width="100vw">
        <Board boardId={boardId} />
      </Box>
    </Box>
  );
};

export default BoardPage;
