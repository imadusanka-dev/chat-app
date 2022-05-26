import React, { useState, useRef, useEffect } from "react";
import moment from "moment";

const ChatBody = ({ messages, user }) => {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(true);
  const messagesEndRef = useRef(null);
  let previousDate = null;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log("-----------hiii");
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" });
  };

  const toggleVisible = () => {
    const scrolled = window.scrollY;
    console.log("-------------------", scrolled);
    if (scrolled > 0) {
      setScrollButtonVisible(false);
    } else if (scrolled <= 0) {
      setScrollButtonVisible(true);
    }
  };

  const getDate = (timestamp) => {
    if (moment(timestamp?.toDate()).format("DD/MM/YYYY") !== previousDate) {
      let date;
      if (
        moment(timestamp?.toDate()).format("DD/MM/YYYY") ===
        moment().format("DD/MM/YYYY")
      ) {
        date = "TODAY";
      } else if (
        moment(timestamp?.toDate()).format("DD/MM/YYYY") ===
        moment().subtract(1, "days").format("DD/MM/YYYY")
      ) {
        date = "YESTERDAY";
      } else {
        date = moment(timestamp?.toDate()).format("DD/MM/YYYY");
      }
      previousDate = moment(timestamp?.toDate()).format("DD/MM/YYYY");
      return (
        <div className="chat__dateContainer">
          <span className="chat__date">{date}</span>
        </div>
      );
    }
  };

  return (
    <div className="chat__body">
      {messages.map((message) => (
        <div key={message?.id}>
          {getDate(message.timestamp)}
          <p
            className={`chat__message ${
              user?.uid === message.userId && "chat__receiver"
            }`}
            key={message.id}
          >
            <div className="chat__name">{message.name}</div>
            {message.message}
            <span className="chat__timestamp">
              {moment(message.timestamp?.toDate()).format("hh:mm a")}
            </span>
          </p>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBody;
