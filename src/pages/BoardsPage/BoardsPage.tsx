import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Board } from "../../types";

import BoardsPageInterface from "./BoardsPageInterface";

interface BoardsPageProps {}

const BoardsPage: React.FC<BoardsPageProps> = () => {
  const firebase = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const [error, setError] = useState<Error>(null);
  const [memberBoards, setMemberBoards] = useState<Array<Board>>([]);
  const [ownerBoards, setOwnerBoards] = useState<Array<Board>>([]);

  const fetchMemberBoards = () => {
    if (user.uid) {
      try {
        return firebase.firestore
          .collection("boards")
          .where(`members.${user.uid}.hasAccess`, "==", true)
          .onSnapshot((snapshot: any) => {
            const fetchedBoards: Array<Board> = [];
            snapshot.forEach((snap: any) => {
              fetchedBoards.push({ uid: snap.id, ...snap.data() });
            });
            setMemberBoards(fetchedBoards);
          });
      } catch (e) {
        setError(e);
      }
    }
  };

  const fetchOwnerBoards = () => {
    if (user.uid) {
      try {
        return firebase.firestore
          .collection("boards")
          .where(`owners.${user.uid}.hasAccess`, "==", true)
          .onSnapshot((snapshot: any) => {
            const fetchedBoards: Array<Board> = [];
            snapshot.forEach((snap: any) => {
              fetchedBoards.push({ uid: snap.id, ...snap.data() });
            });
            setOwnerBoards(fetchedBoards);
          });
      } catch (e) {
        setError(e);
      }
    }
  };

  const listenForUserBoards = () => {
    const unsubscribeToMemberBoards = fetchMemberBoards();
    const unsubscribeToOwnerBoards = fetchOwnerBoards();
    return [unsubscribeToMemberBoards, unsubscribeToOwnerBoards];
  };

  const unsubscribe = (unsubscribers: any) => {
    unsubscribers.forEach((u: any) => {
      if (u) {
        u();
      }
    });
  };

  useEffect(() => {
    const unsubscribers: any = listenForUserBoards();
    return () => unsubscribe(unsubscribers);
  }, []);

  const boards = [...ownerBoards, ...memberBoards];

  return <BoardsPageInterface boards={boards} />;
};

export default BoardsPage;
