import React, { useState, useEffect } from "react";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";

// @mui material components
import Grid from "@mui/material/Grid";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { Col, Row, Container } from "react-bootstrap";

import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function EditDocument() {
  // const [userID, setUserID] = useState("");
  const [forData, setForData] = useState("");
  const [fromData, setFromData] = useState("");
  const [purpose, setPurpose] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [projectNo, setProjectNo] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [prNo, setPrNo] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [rlNo, setRlNo] = useState("");
  const [remarks, setRemarks] = useState("");
  // const [officeApproval, setOfficeApproval] = useState("");
  const navigate = useNavigate();

  /* eslint-disable */
  .1
  const onSubmit = () => {
    e.preventDefault();
    const documentObject = {
      userID: user_id_fk,
      forData: for_data,
      fromData: from_data,
      purpose: purpose,
      accountCode: account_code,
      projectNo: project_no,
      projectTitle: project_title,
      prNo: pr_no,
      datePosted: date_posted,
      rlNo: rl_no,
      remarks: remarks,
      officeApproval: office_approval
    };
    axios
      .post("http://localhost:3002/api/documents/add", documentObject)
      .then((res) => {
        if (res.status === 200) alert("successfully created");
        else Promise.reject();
      })
      .catch((err) => alert("Something went wrong"));
  };

  useEffect(() => {
    console.log(
      forData,
      fromData,
      purpose,
      accountCode,
      projectNo,
      projectTitle,
      prNo,
      datePosted,
      rlNo,
      remarks
    );
  }, [
    forData,
    fromData,
    purpose,
    accountCode,
    projectNo,
    projectTitle,
    prNo,
    datePosted,
    rlNo,
    remarks,
  ]);

  return (
    <DashboardLayout>
      <form onSubmit={onSubmit}>
        <DashboardNavbar light />
        <Container>
          <Row>
            <Row>
              <Col>
                <Grid>
                  <Col>
                    {/* <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="user"
                        name="userID"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        fullWidth
                      />
                    </MDBox> */}
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="For"
                        name="forData"
                        value={forData}
                        onChange={(e) => setForData(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="From"
                        name="fromData"
                        value={fromData}
                        onChange={(e) => setFromData(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="Purpose"
                        name="purpose"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="Account Code"
                        name="accountCode"
                        value={accountCode}
                        onChange={(e) => setAccountCode(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="Project No."
                        name="projectNo"
                        value={projectNo}
                        onChange={(e) => setProjectNo(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                  </Col>
                </Grid>
              </Col>
              <Col>
                <Grid>
                  <Col>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="Project Title"
                        name="projectTitle"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="PR No."
                        name="prNo"
                        value={prNo}
                        onChange={(e) => setPrNo(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="date"
                        label="Date Posted"
                        name="datePosted"
                        value={datePosted}
                        onChange={(e) => setDatePosted(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="RL No."
                        name="rlNo"
                        value={rlNo}
                        onChange={(e) => setRlNo(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="Remarks"
                        name="remarks"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        fullWidth
                      />
                    </MDBox>
                    {/* <MDBox py={2}>
                      <MDInput
                        type="text"
                        label="officeApproval"
                        name="officeApproval"
                        value={officeApproval}
                        onChange={(e) => setOfficeApproval(e.target.value)}
                        fullWidth
                      />
                    </MDBox> */}
                  </Col>
                </Grid>
              </Col>
            </Row>
          </Row>
        </Container>
        <Grid container>
          <Grid item xs={5} p={2}>
            <MDButton
              p={5}
              color="info"
              variant="contained"
              size="small"
              onClick={() => navigate("/documents")}
            >
              <Icon fontSize="medium">save</Icon>
              <MDTypography px={1} py={1} variant="h7" color="white">
                Cancel
              </MDTypography>
            </MDButton>

            <MDButton p={5} color="info" variant="contained" size="small" type="submit">
              <Icon fontSize="medium">save</Icon>
              <MDTypography px={1} py={1} variant="h7" color="white">
                Save
              </MDTypography>
            </MDButton>
          </Grid>
        </Grid>
        {/* <Footer /> */}
      </form>
    </DashboardLayout>
  );
}
