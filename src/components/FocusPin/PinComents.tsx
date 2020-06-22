import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext, BoardContext } from "../../contexts";
import {
  Typography,
  Button,
  Box,
  ListItemText,
  List,
  ListItem,
} from "@material-ui/core";
import { NumberInput, TextInput } from "../inputs";
import { Form, Formik } from "formik";
import { PinComment, PinCommentPermission } from "../../types";

interface PinCommentsProps {
  pinId: string;
  permission: PinCommentPermission;
  pinCreatorId: string;
}

const PinComments: React.FC<PinCommentsProps> = ({
  pinId,
  permission,
  pinCreatorId,
}) => {
  const firebase = useContext(FirebaseContext);
  const board = useContext(BoardContext);
  const [comments, setComments] = useState<Array<PinComment>>([]);
  const user = useContext(UserContext);

  const listenToAllComments = () => {
    return firebase.firestore
      .collection("pins")
      .doc(pinId)
      .collection("comments")
      .onSnapshot((snapshot: any) => {
        const newComments: Array<PinComment> = [];
        snapshot.forEach((snap: any) => {
          console.log("snapshot", snap.data());
          newComments.push({ uid: snap.id, ...snap.data() });
        });
        setComments(newComments);
      });
  };

  const listenToSelfComments = () => {
    return firebase.firestore
      .collection("pins")
      .doc(pinId)
      .collection("comments")
      .where("createdBy.uid", "==", user.uid)
      .onSnapshot((snapshot: any) => {
        const newComments: Array<PinComment> = [];
        snapshot.forEach((snap: any) => {
          console.log("snapshot", snap.data());
          newComments.push({ uid: snap.id, ...snap.data() });
        });
        setComments(newComments);
      });
  };

  const listenToComments = (): (() => void) => {
    if (pinCreatorId === user.uid) {
      return listenToAllComments();
    } else if (board && !!board.owners[user.uid]) {
      return listenToAllComments();
    } else if (board && permission === "BOARD" && !!board.members[user.uid]) {
      return listenToAllComments();
    } else if (permission === "COMMENTOR") {
      return listenToSelfComments();
    } else {
      return () => null;
    }
  };
  useEffect(() => {
    if (board) {
      const unsubscribe = listenToComments();
      return () => unsubscribe();
    }
  }, []);

  return (
    <List>
      {comments.map((c, i) => (
        <ListItem>
          <ListItemText
            primary={c.content.text}
            secondary={c.createdBy.username}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default PinComments;
