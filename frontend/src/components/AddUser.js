import React, { useState, useEffect } from "react";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function AddUser() {
  const [user, setUser] = useState([]);
  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
    confirm_password: "",
  };
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "Enter more than 3 characters"),
    lastname: Yup.string().min(3, "Enter more than 3 characters"),
    email: Yup.string().email("Enter valid email address"),
    password: Yup.string()
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirm_password: Yup.string()
      .required("Please re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUser(res.data);
      })
      .catch();
  }, []);

  const onFormSubmit = (values, { resetForm }) => {
    values.id = user[user.length - 1].id + 1;
    axios
      .post("http://localhost:4000/app/addUser", values)
      .then((res) => {
        if (res.status === 201) {
          toast.success("User added!", {
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
        toast.error("Error to add User!", {
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
                    label="First name"
                    name="firstname"
                    value={formik.values.firstname}
                    placeholder="enter first-name"
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
                    type="text"
                    variant="outlined"
                    label="Last name"
                    name="lastname"
                    value={formik.values.lastname}
                    placeholder="enter last-name"
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
                    type="email"
                    variant="outlined"
                    label="Email"
                    name="email"
                    placeholder="enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.email && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.email}
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
                  <InputLabel id="role" required>
                    Role
                  </InputLabel>
                  <Select
                    labelId="role-select"
                    id="role-select"
                    label="Role"
                    name="role"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Seller">Seller</MenuItem>
                    <MenuItem value="Buyer">Buyer</MenuItem>
                  </Select>
                </div>
                <div
                  style={{
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <TextField
                    type="password"
                    variant="outlined"
                    label="Password"
                    name="password"
                    placeholder="enter password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.password && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.password}
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
                    type="password"
                    variant="outlined"
                    label="Confitm password"
                    name="confirm_password"
                    placeholder="confirm password"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.confirm_password && (
                    <span
                      style={{
                        padding: 5,
                        color: "red",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {formik.errors.confirm_password}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                >
                  add user
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

export default AddUser;
