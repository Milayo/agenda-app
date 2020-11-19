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

import {
  auth,
  createUserProfileDocument,
} from "./../firebase/firebase.utils.jsx";

const SignUpStyles = {
  marginTop: "150px",
  marginLeft: "450px",
};

const SignUp = (props) => {
  const [userDetails, setUserDetails] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: null,
  });

  const { displayName, email, password, confirmPassword } = userDetails;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    if (password.length < 6) {
      alert("Sign Up Failed, Ensure Your Password is 6 Characters or More.");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setUserDetails({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  return (
    <MDBContainer style={SignUpStyles}>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={handleSubmit}>
                <p className="h4 text-center py-4">REGISTER</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    name="displayName"
                    value={displayName}
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleChange}
                    required
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    name="email"
                    value={email}
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleChange}
                    required
                  />

                  <MDBInput
                    value={password}
                    name="password"
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    onChange={handleChange}
                    validate
                    required
                  />

                  <MDBInput
                    label="Confirm your password"
                    icon="exclamation-triangle"
                    group
                    name="confirmPassword"
                    value={confirmPassword}
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
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

export default SignUp;
