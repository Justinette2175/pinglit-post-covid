import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";

import { Button } from "@material-ui/core";
import RegisterForm from "./RegisterForm";

interface RegisterPageProps {}

export interface FormValues {
  email: string;
  password: string;
}

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const register = async ({ email, password }: FormValues): Promise<void> => {
    try {
      const userCredentials = await firebase.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      await firebase.firestore
        .collection("users")
        .doc(userCredentials.user.uid)
        .set({});
    } catch (e) {
      console.log("RegisterPage:register", e);
      setError(e);
    }
  };

  return <RegisterForm onSubmit={register} error={error} />;
};

export default RegisterPage;
