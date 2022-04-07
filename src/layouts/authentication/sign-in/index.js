/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

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
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import axios from "axios";
import { isEmpty } from "lodash";
import { Cookies } from "react-cookie";

import { useNavigate } from "react-router-dom";

import * as url from "../../../helpers/url_helper";

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

  const [rememberMe, setRememberMe] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsernameField, seterrorUsernameField] = useState(false);
  const [errorPasswordField, seterrorPasswordField] = useState(false);

  const [warningSB, setWarningSB] = useState(false);
  const closeWarningSB = () => setWarningSB(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleAuthentication = async () => {
    const formData = {
      username,
      password,
    };

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
      dispatch({ type: "SIGNIN" });

      await axios
        .post(process.env.REACT_APP_DOMAIN + url.POST_LOGIN, formData, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          dispatch({ type: "SIGNIN_SUCCESS", payload: response.data });
          setWarningSB(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            dispatch({ type: "SIGNIN_FAIL", payload: error.response.data.message });
            setWarningSB(true);
          } else {
            dispatch({ type: "SIGNIN_FAIL", payload: error.response.data });
            setWarningSB(true);
          }
        });
    }
  };

  useEffect(() => {
    if (!isEmpty(state.signInResponse)) {
      cookies.set("userId", state.signInResponse.userId);
      cookies.set("role", state.signInResponse.role);

      // console.log("cookies are set");
      window.location.reload();
      navigate("/dashboard");
    }
  }, [state.signInResponse]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          {state.loading ? (
            <MDAlert color="secondary" dismissible={false}>
              <MDTypography variant="body2" color="white">
                Verifying Credentials
              </MDTypography>
            </MDAlert>
          ) : null}

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
