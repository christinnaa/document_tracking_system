import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
// Material Dashboard 2 React components
import Icon from "@mui/material/Icon";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ closeModal, openModal }) {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MDBox py={2}>
            <MDTypography id="modal-modal-description" color="dark" variant="h6" component="h2">
              Are you sure to this delete document?
            </MDTypography>
          </MDBox>
          <MDBox px={2}>
            <MDButton p={5} color="info" variant="contained" size="small" onClick={closeModal}>
              <Icon fontSize="medium">cancel</Icon>
              <MDTypography px={1} py={1} variant="h7" color="white">
                Cancel
              </MDTypography>
            </MDButton>

            <MDButton p={5} color="error" variant="contained" size="small">
              <Icon fontSize="medium">delete</Icon>
              <MDTypography px={1} py={1} variant="h7" color="white">
                Delete
              </MDTypography>
            </MDButton>
          </MDBox>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  openModal: PropTypes.string.isRequired,
  closeModal: PropTypes.string.isRequired,
};
