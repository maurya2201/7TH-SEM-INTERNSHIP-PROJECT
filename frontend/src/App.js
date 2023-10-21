import AddBooks from "./components/AddBooks";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/NotFound";
import GetBook from "./components/GetBook";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import GetUser from "./components/GetUser";
import UpdateProfile from "./components/UpdateProfile";
import { Provider } from "react-redux";
import { store } from "./state/store";
import UpdateBook from "./components/UpdateBook";
import Statistics from "./components/Statistics";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/addBooks"
              element={<Protected Component={AddBooks} />}
            />
            <Route
              path="/getBooks"
              element={<Protected Component={GetBook} />}
            />
            <Route path="/cart" element={<Protected Component={Cart} />} />
            <Route
              path="/getUser"
              element={<Protected Component={GetUser} />}
            />
            <Route
              path="/updateProfile"
              element={<Protected Component={UpdateProfile} />}
            />
            <Route
              path="/updateBook"
              element={<Protected Component={UpdateBook} />}
            />
            <Route
              path="/updateProfile/:id"
              element={<Protected Component={UpdateProfile} />}
            />
            <Route
              path="/statistics/:bid"
              element={<Protected Component={Statistics} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
