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
import { UserContext } from "./contexts";

import { User } from "./types";

import AppBar from "./components/AppBar";

const firebase = new Firebase();

interface AuthData {
  authUser: User;
  authenticated: boolean;
  loading: boolean;
}

function App() {
  const [user, setUser] = useState<User>({});
  const [{ authUser, authenticated, loading }, setAuthData] = useState<
    AuthData
  >({
    authUser: null,
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    const unsubsribe = firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        setAuthData({ authUser: user, authenticated: true, loading: false });
      } else {
        setAuthData({ authUser: null, authenticated: false, loading: false });
      }
    });
    return () => unsubsribe();
  }, []);

  const listenToUser = () => {
    try {
      firebase.firestore
        .collection("users")
        .doc(authUser.uid)
        .onSnapshot((u: any) => {
          setUser({ uid: u.id, ...u.data() });
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

  const PrivateRoute: React.FC<any> = (props: any) => {
    if (!authenticated) {
      return (
        <Redirect
          to={{
            pathname: "/login",
            search: `?redirect=${props.location.pathname}`,
          }}
        />
      );
    }
    return <Route {...props} />;
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <FirebaseContext.Provider value={firebase}>
      <UserContext.Provider value={[user, setUser]}>
        <MuiThemeProvider theme={lightTheme}>
          <CssBaseline />
          <AppBar />
          <Box position="relative" top="64px">
            <Switch>
              <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to="/boards" />}
              />
              <PrivateRoute
                path="/invitations/:invitationId"
                component={InvitationPage}
              />
              <PrivateRoute exact path="/boards" component={BoardsPage} />
              <PrivateRoute path="/boards/:boardId" component={BoardPage} />
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
              <Route component={I404Page} />
            </Switch>
          </Box>
        </MuiThemeProvider>
      </UserContext.Provider>
    </FirebaseContext.Provider>
  );
}

export default App;
