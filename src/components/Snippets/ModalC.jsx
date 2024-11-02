import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
};

export default function ModalC({ isOpen, setIsOpen, info }) {
  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="box">
        <div className="content">
          <h3>{'"' + info.head + '"'}</h3>
          <div className="mod-details">
            <b>{info.subhead}</b> {" " + info.details}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
