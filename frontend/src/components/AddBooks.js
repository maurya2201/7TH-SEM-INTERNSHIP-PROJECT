import React, { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddBooks() {
  const [book, setBook] = useState([]);
  const initialValues = {
    id: "",
    sid: "",
    name: "",
    price: "",
    description: "",
    pages: "",
    cover: "",
    sname: "",
  };

  const [base64Image, setBase64Image] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please type title of the book")
      .min(3, "Enter more than 3 characters"),
    price: Yup.string().required("Please enter price for the book"),
    description: Yup.string()
      .required("Please type description of the book")
      .min(20, "Enter more than 20 characters"),
    pages: Yup.string().required("Please enter no of pages of the book"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllBooks")
      .then((res) => {
        setBook(res.data);
      })
      .catch();
  }, []);

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64Image(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (values, { resetForm }) => {
    values.id = book[book.length - 1].id + 1;

    if (localStorage.getItem("id")) {
      values.sid = localStorage.getItem("id");
    }
    if (localStorage.getItem("firstname") && localStorage.getItem("lastname")) {
      values.sname =
        localStorage.getItem("firstname") +
        " " +
        localStorage.getItem("lastname");
    }
    values.cover = base64Image;
    axios
      .post("http://localhost:4000/app/addBook", values)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Book added!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      })
      .catch((err) => {
        toast.error("Error to add book!", {
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
    resetForm({ values: "" });
  };

  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          padding: 10,
          rowGap: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <ThemeProvider theme={theme}>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Name"
                    name="name"
                    placeholder="enter name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.name && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.name}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Price"
                    name="price"
                    value={formik.values.price}
                    placeholder="enter price"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.price && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.price}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Description"
                    name="description"
                    placeholder="enter description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.description && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.description}
                    </span>
                  )}
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="number"
                    variant="outlined"
                    label="Pages"
                    name="pages"
                    placeholder="enter pages"
                    value={formik.values.pages}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.pages && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.pages}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="file"
                    variant="outlined"
                    label="Cover page"
                    name="cover"
                    placeholder="enter cover page"
                    onChange={handleCoverUpload}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                >
                  add book
                </Button>
              </ThemeProvider>
            </form>
          )}
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}
