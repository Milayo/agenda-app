import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./components/homepage/homepage.jsx";
import Header from "./components/header/header.jsx";
import AgendaPage from "./components/agendapage/agendapage.jsx";
import SignUp from "./components/signup/signup.jsx";
import Footer from "./components/footer/footer.jsx";
import { setCurrentUser } from "./redux/user/user-actions.js";
import {
  auth,
  createUserProfileDocument,
} from "./components/firebase/firebase.utils.jsx";

import "./index.css";

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/agendapage" render={() =>
              this.props.currentUser ? (
                <AgendaPage/>
              ) : (
                <HomePage />
              )
            }/>
          <Route exact path="/signup" render={() =>
              this.props.currentUser ? (
                <HomePage/>
              ) : (
                <SignUp />
          )
            } />
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/agendapage" />
              ) : (
                <HomePage/>
              )
            }
          />
                </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
