import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { BoardContext } from "../../contexts";
import {
  Box,
  Button,
  List,
  ListItemText,
  ListItem,
  useTheme,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextInput } from "../inputs";
import { BoardInvitation } from "../../types";
import Config from "../../config";
import InvitationListItem from "./InvitationListItem";

interface UpdateBoardPermissionProps {}

const UpdateBoardPermission: React.FC<UpdateBoardPermissionProps> = () => {
  const theme = useTheme();

  const firebase = useContext(FirebaseContext);

  const board = useContext(BoardContext);
  const boardId = board ? board.uid : null;

  const [invitations, setInvitations] = useState<{
    [key: string]: BoardInvitation;
  }>({});

  const [addNew, setAddNew] = useState<boolean>(false);

  const listenToInvitations = () => {
    return firebase.firestore
      .collection("invitations")
      .where("boardId", "==", boardId)
      .onSnapshot((snapshot: any) => {
        const newLinks: {
          [key: string]: BoardInvitation;
        } = {};
        snapshot.forEach((snap: any) => {
          newLinks[snap.id] = snap.data();
        });
        setInvitations(newLinks);
      });
  };

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      const batch = firebase.firestore.batch();
      const inviteRef = firebase.firestore.collection("invitations").doc();
      batch.set(inviteRef, {
        boardId,
      });
      batch.set(inviteRef.collection("private").doc("private"), {
        password,
      });
      await batch.commit();
      setAddNew(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (boardId) {
      const unsubscribe = listenToInvitations();
      return () => unsubscribe();
    }
  }, [boardId]);

  return (
    <Box p={4} width="100%" maxWidth={theme.breakpoints.values.md}>
      <Box>
        <List dense>
          {Object.keys(invitations).map((invitationId, i) => (
            <InvitationListItem
              key={`invitation-${i}`}
              invitationId={invitationId}
            />
          ))}
        </List>
      </Box>
      {addNew ? (
        <Formik
          validateOnMount={true}
          initialValues={{
            password: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isValid, values }) => (
            <Form>
              <Box mb={3}>
                <TextInput name="password" label="Password" />
              </Box>
              <Button type="submit" color="primary" variant="contained">
                Save
              </Button>
            </Form>
          )}
        </Formik>
      ) : (
        <Button onClick={() => setAddNew(true)}>New link</Button>
      )}
    </Box>
  );
};

export default UpdateBoardPermission;
