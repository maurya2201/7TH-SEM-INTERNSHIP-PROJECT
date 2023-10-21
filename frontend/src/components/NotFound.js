import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../mui_style";

function NotFound() {
  const Navigate = useNavigate();

  function toHome() {
    Navigate("/");
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: 10 }}>
        Page not found!
        <br />
        <Button
          variant="contained"
          onClick={toHome}
          style={{ margin: 10, width: 80 }}
        >
          Go back to home
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default NotFound;
