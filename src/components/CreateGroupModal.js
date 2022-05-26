import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const CreateGroupModal = ({ open, handleClose }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreate = async () => {
    if (!groupName) return;

    try {
      const colRef = collection(db, "room");
      const docRef = doc(colRef);
      await setDoc(docRef, {
        name: groupName,
      });
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new group please enter group name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="group-name"
            label="Group name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateGroupModal;
