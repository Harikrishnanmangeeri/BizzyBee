// EditModal.tsx

import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  selectedRent: Rent | null;
  editedReceivedDate: Date | null;
  onReceivedDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveChanges: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  selectedRent,
  editedReceivedDate,
  onReceivedDateChange,
  onSaveChanges,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          minWidth: "300px",
          maxWidth: "500px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Edit Received Date</h2>
        {selectedRent && (
          <div style={{ marginBottom: "20px" }}>
            <p style={{ marginBottom: "8px" }}>Name: {selectedRent.name}</p>
            <p style={{ marginBottom: "8px" }}>
              Location: {selectedRent.location}
            </p>
            <p style={{ marginBottom: "8px" }}>
              Date: {new Date(selectedRent.date).toLocaleDateString()}
            </p>
            <label htmlFor="receivedDate" style={{ marginBottom: "8px" }}>
              Received Date:
            </label>
            <input
              type="date"
              id="receivedDate"
              value={
                editedReceivedDate
                  ? editedReceivedDate.toISOString().split("T")[0]
                  : ""
              }
              onChange={onReceivedDateChange}
              style={{
                marginBottom: "16px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                onClick={onSaveChanges}
                style={{ marginRight: "8px" }}
              >
                Save Changes
              </Button>
              <Button variant="contained" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default EditModal;
