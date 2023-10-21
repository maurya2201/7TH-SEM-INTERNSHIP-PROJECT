import { Button, ThemeProvider } from "@mui/material";
import React from "react";
import { theme } from "../mui_style";
function Pagination({ postPerPage, totalPosts, paginate, currentPage }) {
  const totalPages = Math.ceil(totalPosts / postPerPage);

  const goToPrevPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage !== totalPages && currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={goToPrevPage}>PREV</Button>
        {currentPage} of {totalPages}
        <Button onClick={goToNextPage}>NEXT</Button>
      </div>
    </ThemeProvider>
  );
}

export default Pagination;
