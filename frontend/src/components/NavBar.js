import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Avatar, Popover, Button } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserId,
  updateUserFirstName,
  updateUserLastName,
  updateUserRole,
  updateUserLoggedIn,
  removeUserFirstName,
  removeUserLastName,
  removeUserId,
  removeUserRole,
  removeUserLoggedIn,
} from "../state/slice/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

function NavBar() {
  const [log, setLog] = useState();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const userFName = useSelector((state) => state.users.firstname);
  const userLName = useSelector((state) => state.users.lastname);
  const userRole = useSelector((state) => state.users.role);
  const userSId = useSelector((state) => state.users.id);

  const dispatch = useDispatch();

  const removeSetup = () => {
    dispatch(removeUserFirstName);
    dispatch(removeUserLastName);
    dispatch(removeUserRole);
    dispatch(removeUserId);
    dispatch(removeUserLoggedIn);
    localStorage.setItem("loggedIn", false);
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  };
  const logOut = () => {
    removeSetup();
    setOpen(false);
    dispatch(updateUserFirstName("user"));
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {
    let login = localStorage.getItem("loggedIn");
    if (login === "false") {
      setLog("false");
    } else if (login === "true") {
      setLog("true");
      if (localStorage.getItem("firstname")) {
        dispatch(updateUserFirstName(localStorage.getItem("firstname")));
      }
      if (localStorage.getItem("lastname")) {
        dispatch(updateUserLastName(localStorage.getItem("lastname")));
      }
      if (localStorage.getItem("role")) {
        dispatch(updateUserRole(localStorage.getItem("role")));
      }
    }
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">BOOK-MANAGEMENT-SYSTEM</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/cart">
              CART
            </Nav.Link>
            {userRole === "Seller" || userRole === "Admin" ? (
              <Nav.Link as={Link} to="/addBooks">
                ADD BOOKS
              </Nav.Link>
            ) : (
              <div />
            )}
            {userRole === "Seller" || userRole === "Admin" ? (
              <Nav.Link as={Link} to="/getBooks">
                GET BOOKS
              </Nav.Link>
            ) : (
              <div />
            )}
            {userRole === "Admin" ? (
              <Nav.Link as={Link} to="/register">
                ADD USER
              </Nav.Link>
            ) : (
              <div />
            )}
            {userRole === "Admin" ? (
              <Nav.Link as={Link} to="/getUser">
                GET USER
              </Nav.Link>
            ) : (
              <div />
            )}
            {log === "true" ? (
              <Nav.Link as={Link} to="/updateProfile">
                UPDATE PROFILE
              </Nav.Link>
            ) : (
              <div />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div
        style={{
          float: "right",
        }}
      >
        <Container>
          <Navbar.Collapse>
            <Nav className="me-auto">
              {log === "false" ? (
                <Nav.Link as={Link} to="/register">
                  REGISTER
                </Nav.Link>
              ) : (
                <Nav
                  onClick={handleClick}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Avatar sx={{ bgcolor: "#ffffff", color: "#202020" }}>
                    {userFName[0].toUpperCase()}
                    {userLName[0].toUpperCase()}
                  </Avatar>
                </Nav>
              )}
              {log === "false" ? (
                <Nav.Link as={Link} to="/login">
                  LOGIN
                </Nav.Link>
              ) : (
                <div />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </div>
      <Popover
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <div style={{ padding: 10, display: "flex", flexDirection: "column" }}>
          <span>
            {userFName} {userLName}
          </span>
          <span>{userRole}</span>
          <div
            style={{
              borderBottom: "2px solid black",
              margin: 5,
            }}
          ></div>
          <Button onClick={logOut} variant="contained">
            <ExitToAppIcon />
          </Button>
        </div>
      </Popover>
    </Navbar>
  );
}

export default NavBar;
