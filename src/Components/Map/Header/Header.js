import React from "react";
import { PopupMenu } from "react-simple-widgets";
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import image1 from "./test1.jpg";
import image2 from "./test2.jpg";
import logo from "./logotest.png";

//import "./Header.css";
import profileImg from "./profileIMG.png";

import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./../../OAuth/LoginButton";
import LogoutButton from "./../../OAuth/LogoutButton";

const RandomPick = Math.floor(Math.random() * 2);
const Pictures = [image1, image2];
const SelectedPicture = Pictures[RandomPick];
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: "mainNavBar",
      user: {},
    };
  }
  handleScroll = (e) => {
    if (window.pageYOffset > 290) {
      this.setState({ style: "mainNavBar sticky" });
    }
    if (window.pageYOffset < 690) {
      this.setState({ style: "mainNavBar" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    let { isAuthenticated, user } = this.props.auth0;
    if (this.props.auth0.hasOwnProperty("user")) {
      console.log("Logged");
      this.setState({ user: user });
    } else console.log("Not Logged");
  }

  render() {
    const { isAuthenticated, user } = this.props.auth0;

    let userData = {};
    if (isAuthenticated) userData = user;

    let email = userData.email || "test@gmail.com";
    let given_name = userData.given_name || "test test";
    let picture = userData.picture || profileImg;
    //let picture = profileImg;

    let language = userData.locale || "EN";
    let isLoggedIn = isAuthenticated || false;

    return (
      <div class="MapContainer">
        <div onScroll={this.handleScroll}>
          <Navbar collapseOnSelect expand="lg" className={this.state.style}>
            <div style={{ display: "flex" }}>
              <Navbar.Brand>
                <Link to="/" className="nav-link">
                  <img className="logo" width="66px" src={logo}></img>
                </Link>
              </Navbar.Brand>

              {isLoggedIn && (
                <div className="navbarLeftDiv">
                  <div className="leftSideNav">
                    <NavItem>
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </NavItem>

                    <NavItem>
                      <Link to="/Sell-Rent" className="nav-link">
                        Sell/Rent
                      </Link>
                    </NavItem>

                    <NavItem>
                      <Link to="/BrowseHouses" className="nav-link">
                        Browse Houses
                      </Link>
                    </NavItem>

                    <NavItem>
                      <Link to="/YourAssests" className="nav-link">
                        Your Assests
                      </Link>
                    </NavItem>
                    <NavItem>
                      <Link to="/byMap" className="nav-link">
                        Browse By Map
                      </Link>
                    </NavItem>
                  </div>
                </div>
              )}
            </div>

            {!isLoggedIn && (
              <div className="navbarRightDiv">
                <NavItem>
                  <Link to="/" className="nav-link">
                    About us
                  </Link>
                </NavItem>
                <NavItem>
                  <LoginButton id="login" />
                </NavItem>
              </div>
            )}

            {isLoggedIn && (
              <PopupMenu className="profile">
                <button className=" profile">
                  <img
                    src={picture}
                    width={"80px"}
                    styles={{ borderRadius: "50px" }}
                  />
                </button>

                <div className="profileCard text-start">
                  <div className="card-body px-4 py-4">
                    <div
                      id="circle-avatar"
                      className="text-center mx-auto mb-4"
                    >
                      <span>{given_name.slice(0, 1).toUpperCase()}</span>
                    </div>

                    <h5 className="text-center mb-0">{given_name}</h5>
                    <br />
                    <p className="text-center mb-2">{email}</p>

                    <hr />

                    <p
                      className="mb-0"
                      style={{
                        color: "#bebebe",
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                    >
                      Language
                    </p>

                    <p style={{ fontSize: 12 }}>{language.toUpperCase()}</p>

                    <hr className="mb-0" style={{ margin: "0 -24px 0" }} />

                    <hr style={{ margin: "0 -24px 24px" }} />

                    <div className="d-grid">
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </PopupMenu>
            )}
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withAuth0(Header);
