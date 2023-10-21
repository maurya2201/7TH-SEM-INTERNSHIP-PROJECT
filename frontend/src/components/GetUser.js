import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import Pagination from "./Pagination";
import { useNavigate } from "react-router";
import MenuItem from "@mui/material/MenuItem";

function GetUser() {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [postPerPage, setPostPerPage] = useState("5");
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let [currentPosts, setCurrentPosts] = useState();
  currentPosts = user
    .filter(
      (user) =>
        user.firstname.toLowerCase().includes(search) ||
        user.lastname.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  const postPerPageA = [
    {
      value: 5,
      label: "5",
    },
    {
      value: 10,
      label: "10",
    },
    {
      value: 15,
      label: "15",
    },
  ];

  const handlePostPerPage = (e) => {
    setPostPerPage(e.target.value);
  };

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  const onDelete = (id) => {
    axios
      .delete("http://localhost:4000/app/deleteUser/" + id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("User deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setUser(user.filter((user) => user.id !== id));
          setCurrentPosts(currentPosts.filter((book) => book.id !== id));
        }
      })
      .catch((err) => {
        toast.error("Error in deleting user!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUser(res.data);
        toast.success("Success on fetching user details!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error("Error in fetching user details!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  }, []);
  return (
    <div className="App" style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="container" style={{ marginBottom: 20 }}>
        <div className="row">
          <div className="col-1">First name</div>
          <div className="col-1">Last name</div>
          <div className="col-4">Email</div>
          <div className="col-1">Role</div>
          <div className="col-4">Modify</div>
        </div>
      </div>
      <ThemeProvider theme={theme}>
        {currentPosts.map((item) => (
          <div key={item.id} className="container">
            <div className="row">
              <span className="col-1" style={{ paddingTop: 15 }}>
                {item.firstname}
              </span>
              <span className="col-1" style={{ paddingTop: 15 }}>
                {item.lastname}
              </span>
              <span className="col-4" style={{ paddingTop: 15 }}>
                {item.email}
              </span>
              <span className="col-1" style={{ paddingTop: 15 }}>
                {item.role}
              </span>
              <span className="col-4">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                  onClick={() => {
                    navigate("/updateProfile/" + item.id);
                  }}
                >
                  update
                </Button>
                <Button
                  variant="contained"
                  style={{ margin: 10 }}
                  onClick={() => onDelete(item.id)}
                >
                  delete
                </Button>
              </span>
              <hr></hr>
            </div>
          </div>
        ))}
        <div
          style={{
            margin: 10,
            marginBottom: 70,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <TextField
            id="filled-select-currency"
            select
            label="Select"
            defaultValue={postPerPage}
            helperText="Books"
            variant="filled"
            onChange={handlePostPerPage}
          >
            {postPerPageA.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField> */}
          <Pagination
            postPerPage={postPerPage}
            totalPosts={user.length}
            paginate={paginate}
            currentPage={page}
          />
        </div>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}

export default GetUser;
