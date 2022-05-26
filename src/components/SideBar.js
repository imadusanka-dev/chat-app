import React, { useState, useEffect } from "react";
import "../styles/SideBar.css";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import {
  SearchOutlined,
  DonutLarge,
  Chat,
  MoreVert,
} from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import CreateGroupModal from "./CreateGroupModal";
import { db, auth } from "../config/firebase";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/stateProvider";

const SideBar = () => {
  const [rooms, setRooms] = useState([]);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchText, setSearchText] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const q = query(
      collection(db, "room"),
      where("name", ">=", searchText),
      where("name", "<=", searchText + "\uf8ff")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const r = [];
      snapshot.forEach((doc) => {
        r.push({
          id: doc.id,
          name: doc.data().name,
        });
      });
      setRooms(r);
    });

    return () => unsubscribe();
  }, [searchText]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setCreateGroupModalVisible(!createGroupModalVisible);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch({
          type: actionTypes.REMOVE_USER,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton onClick={handleMenuClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleModalOpen();
                handleMenuClose();
              }}
            >
              New group
            </MenuItem>
            <MenuItem onClick={() => handleSignOut()}>Log out</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
      <CreateGroupModal
        open={createGroupModalVisible}
        handleClose={handleModalOpen}
      />
    </div>
  );
};

export default SideBar;
