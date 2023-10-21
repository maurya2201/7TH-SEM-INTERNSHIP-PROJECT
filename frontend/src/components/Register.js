import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "../state/slice/userSlice";

function Register() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const initialValues = {
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    role: "Buyer",
    password: "",
    confirm_password: "",
  };
  const userRole = useSelector((state) => state.users.role);
  const dispatch = useDispatch();
  const getCharacterValidationError = (str: string) => {
    return `Your password must have at least 1 ${str} character`;
  };

  const Roles = [
    {
      value: "Admin",
      label: "Admin",
    },
    {
      value: "Seller",
      label: "Seller",
    },
    {
      value: "Buyer",
      label: "Buyer",
    },
  ];

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required("Please type your firstname")
      .min(3, "Enter more than 3 characters"),
    lastname: Yup.string()
      .required("Please type your lastname")
      .min(3, "Enter more than 3 characters"),
    email: Yup.string()
      .required("Please type your email")
      .email("Enter valid email address"),
    password: Yup.string()
      .required("You need to create password for your account!")
      .min(8, "Password must have at least 8 characters")
      .matches(/[0-9]/, getCharacterValidationError("digit"))
      .matches(/[a-z]/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
    confirm_password: Yup.string()
      .required("You need to re-type your password")
      .oneOf([Yup.ref("password")], "Passwords does not match"),
  });

  useEffect(() => {
    if (localStorage.getItem("role")) {
      dispatch(updateUserRole(localStorage.getItem("role")));
    }
    axios
      .get("http://localhost:4000/app/showAllUsers")
      .then((res) => {
        setUser(res.data);
      })
      .catch();
  }, []);

  const onFormSubmit = (values) => {
    values.id = user[user.length - 1].id + 1;

    axios
      .post("http://localhost:4000/app/addUser", values)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Registered successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error occured to register!", {
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
                  label="First Name"
                  name="firstname"
                  placeholder="enter first-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstname}
                  required
                />
                {formik.touched.firstname && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {formik.errors.firstname}
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
                  placeholder="enter last-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastname}
                  required
                />
                {formik.touched.lastname && (
                  <span
                    style={{
                      padding: 5,
                      color: "red",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    {formik.errors.lastname}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
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
                <TextField
                  variant="filled"
                  label="Role"
                  name="role"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.role}
                  select
                  required
                >
                  {userRole === "Admin"
                    ? Roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))
                    : Roles.filter((role) => role.label !== "Admin").map(
                        (option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        )
                      )}
                </TextField>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm_password}
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
              <Button type="submit" variant="contained" style={{ margin: 10 }}>
                Register
              </Button>
            </ThemeProvider>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Register;
