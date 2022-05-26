import React, { useState, useEffect } from "react";
import "../styles/Chat.css";
import { Avatar, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { SearchOutlined, MoreVert, Mic } from "@mui/icons-material";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  orderBy,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useStateValue } from "../context/stateProvider";
import ChatBody from "./ChatBody";
import InputEmoji from "react-input-emoji";
import moment from "moment";

const Chat = () => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [openSearchDrawer, setOpenSearchDrawer] = useState(false);
  const [{ user }] = useStateValue();
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      getRoom();
      getMessages();
    }
  }, [roomId]);

  const getRoom = async () => {
    const docRef = doc(db, "room", roomId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setRoomName(docSnap.data().name);
    } else {
      console.log("No such document!");
    }
  };

  const getMessages = async () => {
    const msgColl = query(
      collection(db, "room", roomId, "messages"),
      orderBy("timestamp")
    );
    onSnapshot(msgColl, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((msg) => ({
          id: msg.id,
          ...msg.data(),
        }))
      );
    });
  };

  const sendMessage = async () => {
    if (!input) return;

    const newCityRef = doc(collection(db, "room", roomId, "messages"));

    const data = {
      message: input,
      userId: user?.uid,
      name: user?.displayName,
      timestamp: serverTimestamp(),
    };

    await setDoc(newCityRef, data);
    setInput("");
  };

  if (!roomId) return <div className="chat__body" />;

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomName}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          {messages?.length > 0 && (
            <p>
              Last updated{" "}
              {moment(
                new Date(messages[messages.length - 1]?.timestamp?.toDate())
              ).format("DD/MM/YYYY hh:mm a")}
            </p>
          )}
        </div>
        <div className="chat__headerRight">
          <IconButton onClick={() => setOpenSearchDrawer(!openSearchDrawer)}>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <ChatBody messages={messages} user={user} />
      <div className="chat__footer">
        <InputEmoji
          value={input}
          onChange={(val) => setInput(val)}
          cleanOnEnter
          onEnter={sendMessage}
          placeholder="Type a message"
        />
        <Mic />
      </div>
    </div>
  );
};

export default Chat;
