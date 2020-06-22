import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";
import { Button } from "@material-ui/core";

interface LogoutButtonProps {}

const LogoutButton: React.FC<LogoutButtonProps> = () => {
  const user = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logout = () => {
    try {
      firebase.auth.signOut();
    } catch (e) {
      //
    }
  };

  if (!user) {
    return null;
  }
  return <Button onClick={logout}>Logout</Button>;
};

export default LogoutButton;
