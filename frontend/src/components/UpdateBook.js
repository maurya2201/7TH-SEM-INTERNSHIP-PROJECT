import React, { useState } from "react";
import { Formik } from "formik";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

function UpdateBook() {
  const [base64Image, setBase64Image] = useState("");
  const navigate = useNavigate();
  const bookid = useSelector((state) => state.book.id);
  const bookname = useSelector((state) => state.book.name);
  const bookpage = useSelector((state) => state.book.page);
  const bookprice = useSelector((state) => state.book.price);
  const bookdescription = useSelector((state) => state.book.description);
  const bookcover = useSelector((state) => state.book.cover);
  const initialValues = {
    id: bookid,
    name: bookname,
    price: bookprice,
    description: bookdescription,
    pages: bookpage,
    cover: bookcover,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Please type title of the book")
      .min(3, "Enter more than 3 characters"),
    price: Yup.number().required("Please enter price for the book"),
    description: Yup.string()
      .required("Please type description of the book")
      .min(20, "Enter more than 20 characters"),
    pages: Yup.number().required("Please enter no of pages of the book"),
  });

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

  const onBookUpdate = (values, { resetForm }) => {
    values.cover = base64Image;
    axios
      .put(
        "http://localhost:4000/app/updateBook/" + bookid,
        values
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Book updated!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setTimeout(() => navigate("/getBooks"), 1000);
        }
      })
      .catch((err) => {
        toast.error("Error to update book!", {
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
          onSubmit={onBookUpdate}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
              <Button type="submit" variant="contained" style={{ margin: 10 }}>
                Update book
              </Button>
            </form>
          )}
        </Formik>
      </div>

      <ToastContainer />
    </div>
  );
}

export default UpdateBook;
