import React, { useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
} from "mdbreact";
import "./homepage.styles.css";
import { withRouter } from "react-router-dom";
import firebase from "./../firebase/firebase.utils.jsx";

const HomePageStyles = {
  marginTop: "150px",
  marginLeft: "450px",
};

const HomePage = (props) => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        props.history.push("/agendapage");
      })
      .catch((error) => {
        setCredentials({ error: error });
      });
    setCredentials({ email: "", password: "" });
  };

  const handleChange = (event) => {
    const { value, name} = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <MDBContainer style={HomePageStyles} className="homepage">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">Login Credentials</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your email"
                    name="email"
                    icon="envelope"
                    group
                    value={email}
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleChange}
                  />

                  <MDBInput
                    label="Your password"
                    name="password"
                    icon="lock"
                    value={password}
                    onChange={handleChange}
                    group
                    type="password"
                    validate
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    LOGIN
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default withRouter(HomePage);
