import React from "react";
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { auth } from "./../firebase/firebase.utils.jsx";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import "./header.styles.css";


const Header = ({ currentUser, history }) => {
  const { pathname } = history.location;

return ( 
  
  <MDBNav
    className="font-weight-bold py-4 px-2 mb-4, header"
    color="blue-gradient"
  >
    {currentUser  && pathname === '/agendapage' ? (
      <div className="option" onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    ) : (
      <section className='section'><MDBNavItem>
          <MDBNavLink to="/signup" className="white-text">
            REGISTER
          </MDBNavLink>
       
        </MDBNavItem>

        <MDBNavItem>
          <MDBNavLink to="/" className="white-text">
            LOGIN
          </MDBNavLink>
        </MDBNavItem>
    </section>
        
    )}
  </MDBNav>
)};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(withRouter(Header));
