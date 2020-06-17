import React, { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";
import { UserContext } from "../../contexts";

import LoginForm from "./LoginForm";
import { Redirect } from "react-router";

export interface FormValues {
  email: string;
  password: string;
}

interface LoginPageProps {
  location: {
    search: string;
  };
}

const LoginPage: React.FC<LoginPageProps> = ({ location: { search } }) => {
  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState<Error>(null);
  const [redirect, setRedirect] = useState<string>("");

  const params: any = new URLSearchParams(search);
  const redirectPath = params.get("redirect");

  const login = async ({ email, password }: FormValues): Promise<any> => {
    try {
      await firebase.auth.signInWithEmailAndPassword(email, password);
      setRedirect(redirectPath);
    } catch (e) {
      console.log("LoginPage:login", e);
      setError(e);
    }
  };

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  return <LoginForm onSubmit={login} error={error} />;
};

export default LoginPage;
