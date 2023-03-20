import { useContext, useEffect, useState } from "react";
import Map from "./scenes/map/Map";
import Cuboid from "./components/Cuboid";
import { Backdrop, CircularProgress } from "@mui/material";
import { loadingContext } from "./context/LoadingContext";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./scenes/auth/SignUp";
import SignIn from "./scenes/auth/SignIn";
import Profile from "./scenes/profile/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import VerifyEmail from "./scenes/auth/VerifyEmail";
import VerifyEmailAlert from "./components/verifyEmailAlert";
import ResetPwd from "./scenes/auth/resetPassword/ResetPwd";
import ResetPwdInstructions from "./scenes/auth/resetPassword/ResetPwdInstructions";
import NewPassword from "./scenes/auth/resetPassword/NewPassword";
import { verifyUser } from "./state/userSlice";
import { fetchPins } from "./state/pinsSlice";

function App() {
  const [captureSrc, setCaptureSrc] = useState("");
  const { loading, toggleLoading } = useContext(loadingContext);
  const [emailVerificationAlert, setEmailVerificationAlert] = useState(false);

  const { user } = useSelector((state) => state.user, shallowEqual);
  const { email } = useSelector((state) => state.resetPwdReducer, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser({ toggleLoading }));
    dispatch(fetchPins());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Map
              {...{ captureSrc, setCaptureSrc, setEmailVerificationAlert }}
            />
          }
        />

        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/signin"
          element={
            user ? (
              <Navigate to="/account" />
            ) : (
              <SignIn setEmailVerificationAlert={setEmailVerificationAlert} />
            )
          }
        />
        <Route
          path="/verifyemail"
          element={
            user && !user?.verified ? <VerifyEmail /> : <Navigate to="/" />
          }
        />

        <Route
          path="/reset-password"
          element={user ? <Navigate to="/" /> : <ResetPwd />}
        />
        <Route
          path="/reset-password/instructions"
          element={
            user ? (
              <Navigate to="/" />
            ) : email ? (
              <ResetPwdInstructions />
            ) : (
              <Navigate to="/reset-password" />
            )
          }
        />
        <Route
          path="/new-password"
          element={user ? <Navigate to="/" /> : <NewPassword />}
        />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>

      {captureSrc && <Cuboid captureSrc={captureSrc} />}

      <VerifyEmailAlert
        {...{ emailVerificationAlert, setEmailVerificationAlert }}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
