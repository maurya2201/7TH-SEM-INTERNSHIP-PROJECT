import React, { useEffect, useState } from "react";
import Login from "./Login";

function Protected(props) {
  const { Component } = props;

  let login = localStorage.getItem("loggedIn");
  useEffect(() => {
    login = localStorage.getItem("loggedIn");
  });

  return <div>{login === "false" ? <Login /> : <Component />}</div>;
}

export default Protected;
