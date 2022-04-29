import React, { useEffect, useReducer, useState } from "react";
import { isEmpty } from "lodash";
import axios from "axios";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import MDSnackbar from "components/MDSnackbar";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// API endpoints
import * as url from "../../helpers/url_helper";

// Mock Data
// import { approvingBodyList } from "../../assets/data/index";

const initialState = {
  loading: false,
  error: "",
  approvingBodyList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_APPROVING_BODY_LIST":
      return {
        ...state,
        loading: true,
        approvingBodyList: [],
        error: "",
      };
    case "GET_APPROVING_BODY_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        approvingBodyList: action.payload,
      };
    case "GET_APPROVING_BODY_LIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function ApprovingBody() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [rows, setRows] = useState([]);

  // Handling notification pop ups if Error
  const [warningSB, setWarningSB] = useState(false);
  const closeWarningSB = () => setWarningSB(false);

  const columns = [
    { Header: "Full Name", accessor: "full_name", align: "left" },
    { Header: "Position", accessor: "position", align: "left" },
    { Header: "Authorization Level", accessor: "auth_level", align: "left" },
    { Header: "Approving Level", accessor: "approving_level", align: "left" },
    { Header: "Approving Office", accessor: "approving_office", align: "left" },
    {
      Header: "Action",
      accessor: "action",
      align: "center",
      disableGlobalFilter: true,
      disableSortBy: true,

      Cell: function ActionDropdown(cell) {
        const { row } = cell;
        // eslint-disable-next-line no-console
        console.log(row);
        return (
          // <MDButton color="info" variant="contained" onClick={() => viewModal(row.values)}>
          //   View
          // </MDButton>
          <MDButton color="info" variant="contained">
            View
          </MDButton>
        );
      },
    },
  ];

  useEffect(async () => {
    dispatch({ type: "GET_APPROVING_BODY_LIST" });

    // dispatch({ type: "GET_APPROVING_BODY_LIST_SUCCESS", payload: approvingBodyList });
    // setWarningSB(false);

    // UNCOMMENT IF API IS AVAILABLE
    await axios
      .get(process.env.REACT_APP_DOMAIN + url.GET_APPROVING_BODY, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        dispatch({ type: "GET_APPROVING_BODY_LIST_SUCCESS", payload: response.data.data });
        setWarningSB(false);
      })
      .catch((error) => {
        if (error.message) {
          dispatch({ type: "GET_APPROVING_BODY_LIST_FAIL", payload: error.message });
          setWarningSB(true);
        } else if (error.response.status === 404) {
          dispatch({ type: "GET_APPROVING_BODY_LIST_FAIL", payload: error.response.data.message });
          setWarningSB(true);
        } else {
          dispatch({ type: "GET_APPROVING_BODY_LIST_FAIL", payload: JSON.stringify(error) });
          setWarningSB(true);
        }
      });
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(state.approvingBodyList)) {
      setRows(state.approvingBodyList);
    }
  }, [state.approvingBodyList]);

  return (
    <DashboardLayout>
      <DashboardNavbar light />
      <MDBox pt={6} pb={3}>
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

        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Approving Body List
                </MDTypography>
              </MDBox>

              <MDBox pt={3}>
                {state.loading ? (
                  <MDBox px={4}>
                    <MDAlert color="secondary" dismissible={false}>
                      <MDTypography variant="body2" color="white">
                        Fetching Data...
                      </MDTypography>
                    </MDAlert>
                  </MDBox>
                ) : (
                  <DataTable
                    table={{ columns, rows }}
                    isSorted
                    showTotalEntries
                    canSearch
                    noEndBorder
                  />
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default ApprovingBody;
