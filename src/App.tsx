import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import { lightTheme } from "./theme";

import { Firebase, FirebaseContext } from "./firebase";

import BoardPage from "./pages/BoardPage";
import BoardsPage from "./pages/BoardsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Box } from "@material-ui/core";
import I404Page from "./pages/404Page";
import { UserContext } from "./contexts";

import { User } from "./types";

import AppBar from "./components/AppBar";

const firebase = new Firebase();

function App() {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    firebase.auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser({ uid: user.uid });
      } else {
        setUser(null);
      }
    });
  }, []);

  const PrivateRoute: React.FC<any> = (props: any) => {
    if (!user) {
      return <Redirect to="/login" />;
    } else return <Route {...props} />;
  };

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
              <PrivateRoute exact path="/boards" component={BoardsPage} />
              <PrivateRoute path="/boards/:boardId" component={BoardPage} />
              <Route
                exact
                path="/login"
                render={(props) =>
                  user ? <Redirect to="/boards" /> : <LoginPage {...props} />
                }
              />
              <Route
                exact
                path="/register"
                render={(props) =>
                  user ? <Redirect to="/boards" /> : <RegisterPage {...props} />
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
