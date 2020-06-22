import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import { lightTheme } from "./theme";

import { Firebase, FirebaseContext } from "./firebase";

import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import InvitationPage from "./pages/InvitationPage";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Box } from "@material-ui/core";
import I404Page from "./pages/404Page";
import UserContext from "./contexts/UserContext";

import { User } from "./types";

import AppBar from "./components/AppBar";

const firebase = new Firebase();

interface AuthData {
  authUser: any;
  authenticated: boolean;
  loading: boolean;
}

const PrivateRoute: React.FC<any> = ({
  authenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              search: `?redirect=${props.location.pathname}`,
            }}
          />
        )
      }
    />
  );
};

function App() {
  const [user, setUser] = useState<User>(null);
  const [authData, setAuthData] = useState<AuthData>({
    authUser: null,
    loading: true,
    authenticated: false,
  });

  const { authUser, authenticated, loading } = authData || {};

  useEffect(() => {
    console.log("app loading");
    firebase.auth.onAuthStateChanged((u: any) => {
      if (u) {
        setAuthData({
          authUser: u,
          authenticated: true,
          loading: false,
        });
      } else {
        setAuthData({ authUser: null, authenticated: false, loading: false });
      }
    });
  }, []);

  const listenToUser = () => {
    try {
      return firebase.firestore
        .collection("users")
        .doc(authUser.uid)
        .onSnapshot((u: any) => {
          const userData = u.data();
          console.log("userData", userData);
          setUser({ uid: u.id, ...userData });
        });
    } catch (e) {}
  };

  useEffect(() => {
    let unsubscribeFromUser: any;
    if (authUser) {
      unsubscribeFromUser = listenToUser();
    }
    return () => {
      if (unsubscribeFromUser) {
        unsubscribeFromUser();
      }
    };
  }, [authUser]);

  if (loading || (authenticated && !user)) {
    return <div>Loading</div>;
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <UserContext.Provider value={user}>
        <MuiThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Box position="relative">
            <Switch>
              <PrivateRoute
                authenticated={authenticated}
                path="/invitations/:invitationId"
                component={InvitationPage}
              />
              <PrivateRoute
                authenticated={authenticated}
                path="/boards/:boardId"
                component={BoardPage}
              />
              <Route
                exact
                path="/login"
                render={(props) => <LoginPage {...props} />}
              />
              <Route
                exact
                path="/register"
                render={(props) =>
                  authenticated ? (
                    <Redirect to="/boards" />
                  ) : (
                    <RegisterPage {...props} />
                  )
                }
              />
              <PrivateRoute
                authenticated={authenticated}
                exact
                path="/boards"
                component={BoardsPage}
              />
              <Route
                authenticated={authenticated}
                exact
                path="/"
                render={() => <Redirect to="/boards" />}
              />
              <Route component={I404Page} />
            </Switch>
          </Box>
        </MuiThemeProvider>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
