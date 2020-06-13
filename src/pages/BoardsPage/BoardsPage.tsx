import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Board } from "../../types";

import { Grid } from "@material-ui/core";
import BoardVignette from "./BoardVignette";

interface BoardsPageProps {}

const BoardsPage: React.FC<BoardsPageProps> = () => {
  const firebase = useContext(FirebaseContext);
  const [user] = useContext(UserContext);
  const [error, setError] = useState<Error>(null);
  const [boards, setBoards] = useState<Array<Board>>([]);

  const listenForUserBoards = async () => {
    if (user.uid) {
      try {
        await firebase.firestore
          .collection("boards")
          .where(`permissions.users.${user.uid}.read`, "==", true)
          .onSnapshot((snapshot: any) => {
            const fetchedBoards: Array<Board> = [];
            snapshot.forEach((snap: any) => {
              fetchedBoards.push({ uid: snap.id, ...snap.data() });
            });
            setBoards(fetchedBoards);
          });
      } catch (e) {
        setError(e);
      }
    }
  };

  useEffect(() => {
    listenForUserBoards();
  }, []);

  return (
    <Grid container spacing={2}>
      {boards.map((b, i) => (
        <Grid item key={`board-${i}`}>
          <BoardVignette board={b} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardsPage;
