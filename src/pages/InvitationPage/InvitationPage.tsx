import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { Box, Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import { TextInput } from "../../components/inputs";
import { Redirect } from "react-router";

interface InvitationPageProps {
  match: {
    params: {
      invitationId: string;
    };
  };
}

const InvitationPage: React.FC<InvitationPageProps> = ({
  match: {
    params: { invitationId },
  },
}) => {
  const firebase = useContext(FirebaseContext);
  const [isValidInvitation, setIsValidInvitation] = useState<boolean>(null);
  const [redirect, setRedirect] = useState<string>(null);

  const getInvitation = async () => {
    const invitation = await firebase.firestore
      .collection("invitations")
      .doc(invitationId)
      .get();
    if (invitation.exists) {
      setIsValidInvitation(true);
    }
  };

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      const res = await firebase.functions.httpsCallable(
        "validateInvitationAccess"
      )({
        invitationId,
        password,
      });
      if (res.data) {
        setRedirect(`/boards/${res.data}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getInvitation();
  }, []);

  if (isValidInvitation === null) {
    return null;
  }
  if (!isValidInvitation) {
    return <div>Invalid invitation</div>;
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return (
    <Box>
      <Formik
        validateOnMount={true}
        initialValues={{
          password: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isValid }) => (
          <Form>
            <Box mb={3}>
              <TextInput name="password" label="Password" />
            </Box>
            <Button type="submit" color="primary" variant="contained">
              Access Board
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default InvitationPage;
