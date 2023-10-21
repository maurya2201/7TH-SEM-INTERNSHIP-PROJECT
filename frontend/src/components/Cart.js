import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../mui_style";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "./Pagination";
import {
  updateCartBookId,
  updateCartUserId,
  updateCartBookName,
  updateCartPrice,
  updateCartBookDescription,
  updateCartBookPage,
  updateCartBookQuantity,
} from "../state/slice/cartSlice";
import { updateUserFirstName, updateUserId } from "../state/slice/userSlice";
import MenuItem from "@mui/material/MenuItem";

export default function Cart() {
  const [cartBook, setCartBook] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState();
  const [bookSell, setBookSell] = useState();
  let [total, setTotal] = useState(0);
  let temp;
  let id;
  const [postPerPage, setPostPerPage] = useState("5");
  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  let [currentPosts, setCurrentPosts] = useState([]);
  currentPosts = cartBook
    .filter(
      (cartBooks) =>
        cartBooks.name.toLowerCase().includes(search) ||
        cartBooks.description.toLowerCase().includes(search)
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

  const dispatch = useDispatch();
  const cartBookId = useSelector((state) => state.cart.bookid);
  const cartUserId = useSelector((state) => state.cart.userid);
  const cartBookName = useSelector((state) => state.cart.name);
  const cartBookPrice = useSelector((state) => state.cart.price);
  const cartBookDescription = useSelector((state) => state.cart.description);
  const cartBookPage = useSelector((state) => state.cart.page);
  const cartBookQuantity = useSelector((state) => state.cart.quantity);
  const userSId = useSelector((state) => state.users.id);
  const userFName = useSelector((state) => state.users.firstname);

  const setup = (bid, uid, name, price, description, page, quantity) => {
    dispatch(updateCartBookId(bid));
    dispatch(updateCartUserId(uid));
    dispatch(updateCartBookName(name));
    dispatch(updateCartBookDescription(description));
    dispatch(updateCartPrice(price));
    dispatch(updateCartBookPage(page));
    dispatch(updateCartBookQuantity(quantity));
  };

  useEffect(() => {
    total = 0;
    if (localStorage.getItem("firstname")) {
      dispatch(updateUserFirstName(localStorage.getItem("firstname")));
    }
    if (localStorage.getItem("id")) {
      id = localStorage.getItem("id");
      dispatch(updateUserId(id));
    }
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/app/showCart/" + id)
      .then((res) => {
        setCartBook(res.data);
        setup(
          res.data.bookid,
          res.data.userid,
          res.data.name,
          res.data.price,
          res.data.description,
          res.data.page,
          res.data.quantity
        );
        let n = res.data.length;
        for (let i = 0; i < n; i++) {
          total = total + res.data[i].quantity * res.data[i].price;
          setTotal(total);
        }
        // res.data.map((book) => setTotal(total + book.quantity * book.price));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quantity]);

  const incrementQuantity = (cid, item) => {
    temp = cartBook.filter((book) => book.cid === cid)[0].quantity;
    cartBook.filter((book) => book.cid === cid)[0].quantity = temp + 1;
    setCartBook((cartBook) => {
      return cartBook;
    });
    onSave(item);
    // setTotal(total + item.quantity * item.price);
    setQuantity(quantity + 1);
  };

  const decrementQuantity = (cid, item) => {
    temp = cartBook.filter((book) => book.cid === cid)[0].quantity;
    if (temp !== 1) {
      cartBook.filter((book) => book.cid === cid)[0].quantity = temp - 1;
      setCartBook((cartBook) => {
        return cartBook;
      });
      onSave(item);
      // setTotal(total - item.quantity * item.price);
    }
    setQuantity(quantity + 1);
  };

  const onSave = (item) => {
    axios
      .put(
        "http://localhost:4000/app/updateCartQuantity/" +
          item.cid,
        item
      )
      .then((res) => {})
      .catch((err) => {
        toast.error("Book updated!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log(err);
      });
  };

  const onDelete = (bid, isPlaced, cid, quantity) => {
    console.log(quantity);
    let arr = {
      buyer: userFName.toString(),
      quantity: quantity.toString(),
    };
    axios
      .delete(
        "http://localhost:4000/app/deleteCart/" +
          userSId +
          "/" +
          bid
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(
            isPlaced
              ? "Book Placed successfully!"
              : "Book removed successfully!",
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            }
          );
          isPlaced
            ? axios
                .put(
                  "http://localhost:4000/app/bookSell/" +
                    bid +
                    "/" +
                    cid,
                  arr
                )
                .then((res) => {
                  console.log("Book " + bid + " selled");
                })
                .catch((err) => {
                  console.log(err);
                })
            : console.log("Not call of placing book");
          setQuantity(quantity + 1);
          setCartBook(cartBook.filter((book) => book.bookid !== bid));
        }
      })
      .catch((err) => {
        toast.error(
          isPlaced ? "Error in placing book!" : "Error in removing book!",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
      });
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TextField
          id="filled-basic"
          label="Search"
          variant="filled"
          value={search}
          style={{ marginTop: 20 }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div style={{ padding: 20 }}>
          <div className="container" style={{ marginBottom: 20 }}>
            <div className="row">
              <div className="col-2">Name</div>
              <div className="col-1">Price</div>
              <div className="col-1">Pages</div>
              <div className="col-2">Quantity</div>
            </div>
          </div>
          {currentPosts.map((item) => (
            <div key={item.cid} className="container">
              <div className="row">
                <span className="col-2" style={{ paddingTop: 15 }}>
                  {item.name}
                </span>
                <span className="col-1" style={{ paddingTop: 15 }}>
                  ₹ {item.price}
                </span>
                <span className="col-1" style={{ paddingTop: 15 }}>
                  {item.page}
                </span>
                <span
                  className="col-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => {
                      incrementQuantity(item.cid, item);
                    }}
                  >
                    <AddCircleIcon />
                  </Button>
                  {item.quantity}
                  <Button
                    onClick={() => {
                      decrementQuantity(item.cid, item);
                    }}
                  >
                    <RemoveCircleIcon />
                  </Button>
                </span>
                <span className="col-4" style={{ display: "inline" }}>
                  <Button
                    variant="contained"
                    style={{ margin: 10 }}
                    onClick={() => {
                      onDelete(item.bookid, false, item.cid, item.quantity);
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{ margin: 10 }}
                    onClick={() => {
                      onDelete(item.bookid, true, item.cid, item.quantity);
                    }}
                  >
                    Place order
                  </Button>
                </span>
                <hr></hr>
              </div>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            <span className="col-2">Total: ₹ {total.toFixed(2)}</span>
          </div>
        </div>
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
            totalPosts={cartBook.length}
            paginate={paginate}
            currentPage={page}
          />
        </div>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}
