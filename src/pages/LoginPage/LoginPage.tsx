import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";

import LoginForm from "./LoginForm";
import { Redirect } from "react-router";

export interface FormValues {
  email: string;
  password: string;
}

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);

  const login = async ({ email, password }: FormValues): Promise<void> => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  return <LoginForm onSubmit={login} error={error} />;
};

export default LoginPage;
