import React, { useEffect, useState } from "react";
import "../styles/SidebarChat.css";
import { Avatar } from "@mui/material";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
} from "firebase/firestore";

const SidebarChat = ({ id, name }) => {
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    const getLastMessage = async () => {
      const msgColl = query(
        collection(db, "room", id, "messages"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      onSnapshot(msgColl, (querySnapshot) => {
        setLastMessage(
          querySnapshot.docs.map((msg) => ({
            id: msg.id,
            ...msg.data(),
          }))
        );
      });
    };
    getLastMessage();
  }, [id]);

  return (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          {lastMessage && <p>{lastMessage[0]?.message}</p>}
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
