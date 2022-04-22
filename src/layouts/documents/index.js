import React, { useEffect, useReducer, useState } from "react";
import { isEmpty } from "lodash";
// import axios from "axios";

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
// import * as url from "../../helpers/url_helper";

// Mock Data
import { documentList } from "../../assets/data/index";

const initialState = {
  loading: false,
  error: "",
  documentList: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_DOCUMENT_LIST":
      return {
        ...state,
        loading: true,
        documentList: [],
        error: "",
      };
    case "GET_DOCUMENT_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        documentList: action.payload,
      };
    case "GET_DOCUMENT_LIST_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function Documents() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [rows, setRows] = useState([]);

  // Handling notification pop ups if Error
  const [warningSB, setWarningSB] = useState(false);
  const closeWarningSB = () => setWarningSB(false);

  const columns = [
    {
      Header: "Document ID",
      accessor: "documentId",
      disableGlobalFilter: true,
      align: "left",
    },
    { Header: "Requestor", accessor: "requestor", align: "left" },
    { Header: "PR No.", accessor: "prNumber", align: "left" },
    { Header: "Date", accessor: "prDate", align: "left" },
    { Header: "RL No.", accessor: "rLNumber", align: "left" },
    {
      Header: "Action",
      accessor: "action",
      align: "center",
      disableGlobalFilter: true,
      disableSortBy: true,
      Cell: function ActionDropdown(cell) {
        const { row } = cell;
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
    dispatch({ type: "GET_DOCUMENT_LIST" });

    dispatch({ type: "GET_DOCUMENT_LIST_SUCCESS", payload: documentList });
    setWarningSB(false);

    // UNCOMMENT IF API IS AVAILABLE
    // await axios
    //   .get(process.env.REACT_APP_DOMAIN + url.GET_DOCUMENTS, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     dispatch({ type: "GET_DOCUMENT_LIST_SUCCESS", payload: response.data });
    //     setWarningSB(false);
    //   })
    //   .catch((error) => {
    //     if (error.message) {
    //       dispatch({ type: "GET_DOCUMENT_LIST_FAIL", payload: error.message });
    //       setWarningSB(true);
    //     } else if (error.response.status === 404) {
    //       dispatch({ type: "GET_DOCUMENT_LIST_FAIL", payload: error.response.data.message });
    //       setWarningSB(true);
    //     } else {
    //       dispatch({ type: "GET_DOCUMENT_LIST_FAIL", payload: JSON.stringify(error) });
    //       setWarningSB(true);
    //     }
    //   });
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(state.documentList)) {
      setRows(state.documentList);
    }
  }, [state.documentList]);

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
                  Document List
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

export default Documents;
