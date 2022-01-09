import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../assets/groww.svg";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

export class Panel extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <div className={classes.home__navbar__brand}>
            <Link
              to="/all-banks"
              style={{ color: "#000", textDecoration: "none" }}
            >
              <img
                src={logo}
                className={classes.home__navbar__brand__logo}
                alt="groww"
              />
            </Link>
          </div>
          <div className={classes.githubLOGO}>
            <Nav>
              <Nav.Link
                style={{ fontSize: "1.7rem" }}
                href="https://github.com/Vishv07/SQL-Editor"
                target="_blank"
              >
                <i
                  className={"fab fa-github " + classes.home__navbar__icons}
                ></i>
              </Nav.Link>
            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}

export default Panel;
