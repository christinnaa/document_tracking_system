import React, { useState, useReducer, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-login.png";
import sysLogo from "assets/images/doctrack-logo.png";
import govLogo from "assets/images/gscwd-logo.png";

// import axios from "axios";
import { isEmpty } from "lodash";
import { Cookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

// import * as url from "../../../helpers/url_helper";

const initialState = {
  loading: false,
  error: "",
  signInResponse: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        loading: true,
        signInResponse: [],
        error: "",
      };
    case "SIGNIN_SUCCESS":
      return {
        loading: false,
        signInResponse: action.payload,
        error: "",
      };
    case "SIGNIN_FAIL":
      return {
        loading: false,
        signInResponse: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

function Basic() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const cookies = new Cookies();

  const users = [
    {
      userId: "employee-001",
      username: "admin",
      password: "mypassword",
      role: "Administrator",
    },
    {
      userId: "employee-002",
      username: "prcurement",
      password: "mypassword",
      role: "Procurement Staff",
    },
    {
      userId: "employee-003",
      username: "approvingBody",
      password: "mypassword",
      role: "Approving Body",
    },
    {
      userId: "employee-004",
      username: "requestor",
      password: "mypassword",
      role: "Requestor",
    },
  ];

  const [rememberMe, setRememberMe] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsernameField, seterrorUsernameField] = useState(false);
  const [errorPasswordField, seterrorPasswordField] = useState(false);

  const [warningSB, setWarningSB] = useState(false);
  const closeWarningSB = () => setWarningSB(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const authenticationRequest = async () => {
    // UNCOMMENT IF API IS AVAILABLE
    // dispatch({ type: "SIGNIN" });
    // await axios
    //   .post(process.env.REACT_APP_DOMAIN + url.POST_LOGIN, formData, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     dispatch({ type: "SIGNIN_SUCCESS", payload: response.data });
    //     setWarningSB(false);
    //   })
    //   .catch((error) => {
    //     if (error.response.status === 500) {
    //       dispatch({ type: "SIGNIN_FAIL", payload: error.response.data.message });
    //       setWarningSB(true);
    //     } else if (error.response.status === 404) {
    //       dispatch({ type: "SIGNIN_FAIL", payload: error.response.data.message });
    //       setWarningSB(true);
    //     } else {
    //       dispatch({ type: "SIGNIN_FAIL", payload: error.message });
    //       setWarningSB(true);
    //     }
    //   });
  };

  const handleAuthentication = () => {
    // const formData = {
    //   username,
    //   password,
    // };

    if (!username) {
      seterrorUsernameField(true);
    } else {
      seterrorUsernameField(false);
    }
    if (!password) {
      seterrorPasswordField(true);
    } else {
      seterrorPasswordField(false);
    }

    if (username && password) {
      // REMOVE IF API IS AVAILABLE
      dispatch({ type: "SIGNIN" });

      const filtered = users.filter(
        (user) => user.username === username && user.password === password
      );
      if (filtered.length >= 0 && !isEmpty(filtered[0])) {
        dispatch({ type: "SIGNIN_SUCCESS", payload: filtered[0] });
        setWarningSB(false);
      } else {
        dispatch({ type: "SIGNIN_FAIL", payload: "Credentials not found" });
        setWarningSB(true);
      }
      // ------------------------

      authenticationRequest();
    }
  };

  useEffect(() => {
    if (!isEmpty(state.signInResponse)) {
      cookies.set("userId", state.signInResponse.userId);
      // cookies.set("userId", state.signInResponse.user_id);
      cookies.set("role", state.signInResponse.role);

      // console.log("cookies are set");
      window.location.reload();
      navigate("/dashboard");
    }
  }, [state.signInResponse]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox display="flex" flexDirection="row" sx={{ justifyContent: "center" }} my={4} gap={4}>
          <img src={govLogo} alt="" height={100} width={100} />
          <img src={sysLogo} alt="" height={100} width={100} />
        </MDBox>
        <MDTypography variant="h5" fontWeight="medium" color="white" textAlign="center">
          DOCUMENT TRACKING SYSTEM
        </MDTypography>
        <MDBox pb={3} pt={3} px={3}>
          {state.error ? (
            <MDSnackbar
              color="error"
              icon="warning"
              title="Error"
              content={state.error}
              dateTime=""
              open={warningSB}
              onClose={closeWarningSB}
              close={closeWarningSB}
              bgWhite
            />
          ) : null}
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                error={errorUsernameField}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                error={errorPasswordField}
                autoComplete="true"
              />
            </MDBox>

            {state.loading ? (
              <MDAlert color="warning" dismissible={false}>
                <MDTypography variant="body2" color="white">
                  Verifying Credentials
                </MDTypography>
              </MDAlert>
            ) : null}

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={handleAuthentication} fullWidth>
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
