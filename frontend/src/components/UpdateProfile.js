import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFirstName,
  updateUserId,
  updateUserLastName,
  updateUserRole,
} from "../state/slice/userSlice";
import { Button, ThemeProvider } from "@mui/material";
import { theme } from "../mui_style";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import MenuItem from "@mui/material/MenuItem";
import * as Yup from "yup";

function UpdateProfile() {
  const [pass, setPass] = useState();
  const [role, setRole] = useState();
  let userSId = useSelector((state) => state.users.id);
  const { id } = useParams();
  let userRole = useSelector((state) => state.users.role);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  let initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    password: "",
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
    password: Yup.string().required("Please type your password"),
  });
  useEffect(() => {
    if (localStorage.getItem("id") && id === undefined) {
      dispatch(updateUserId(localStorage.getItem("id")));
      userSId = localStorage.getItem("id");
    } else {
      dispatch(updateUserId(id));
      userSId = id;
    }
    if (localStorage.getItem("role")) {
      userRole = localStorage.getItem("role");
      dispatch(updateUserRole(localStorage.getItem("role")));
    }
    axios
      .get("http://localhost:4000/app/showUser/" + userSId)
      .then((res) => {
        if (res.status === 200) {
          initialValues.firstname = res.data.firstname;
          initialValues.lastname = res.data.lastname;
          initialValues.email = res.data.email;
          initialValues.role = res.data.role;
          setPass(res.data.password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setupUpdate = (fname, lname, role) => {
    dispatch(updateUserFirstName(fname));
    dispatch(updateUserLastName(lname));
    dispatch(updateUserRole(role));
    localStorage.setItem("firstname", fname);
    localStorage.setItem("lastname", lname);
    localStorage.setItem("role", role);
  };

  const onUpdate = (values) => {
    if (pass === values.password) {
      axios
        .put("http://localhost:4000/app/updateUser/" + userSId,values)
        .then((res) => {
          if (res.status === 200) {
            {
              id === undefined ? (
                setupUpdate(values.firstname, values.lastname, values.role)
              ) : (
                <div></div>
              );
            }
            toast.success("Updated successfully!", {
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
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error occured to update!", {
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
    } else {
      toast.error("Wrong password!", {
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
          onSubmit={onUpdate}
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
                    value={formik.values.lastname}
                    placeholder="enter last-name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
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
                {userRole === "Admin" ? (
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
                      defaultValue="Buyer"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.role}
                      select
                      required
                    >
                      {Roles.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                ) : (
                  <div></div>
                )}

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
                <Button
                  type="submit"
                  variant="contained"
                  style={{ margin: 10 }}
                >
                  Update
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

export default UpdateProfile;
