import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { ListItemText, ListItem } from "@material-ui/core";
import Config from "../../config";

interface InvitationListItemProps {
  invitationId: string;
}

const InvitationListItem: React.FC<InvitationListItemProps> = ({
  invitationId,
}) => {
  const firebase = useContext(FirebaseContext);
  const [password, setPassword] = useState<string>("");

  const fetchPassword = async () => {
    const privateData = await firebase.firestore
      .collection("invitations")
      .doc(invitationId)
      .collection("private")
      .doc("private")
      .get();
    setPassword(privateData.data().password);
  };

  useEffect(() => {
    fetchPassword();
  }, []);

  const makeLink = (invitationId: string) => {
    return `${Config.BASE_URL}/invitations/${invitationId}`;
  };

  return (
    <ListItem>
      <ListItemText
        primary={makeLink(invitationId)}
        secondary={`Password: ${password}`}
      />
    </ListItem>
  );
};

export default InvitationListItem;
