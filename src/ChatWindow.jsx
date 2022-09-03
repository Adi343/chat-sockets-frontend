import React, { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";

const webSocketUrl = process.env.REACT_APP_API;
const userId = nanoid();

export default function ChatWindow() {
  const [chatData, setChatData] = useState([]);
  const [chat, setChat] = useState("");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const webSocket = useRef(null);

  useEffect(() => {
    if (webSocket.current === null || webSocket.current === {}) {
      webSocket.current = new WebSocket(webSocketUrl);

      webSocket.current.addEventListener("message", function (event) {
        console.log(`event is ${JSON.stringify(event)}`);
        console.log(`event.data is ${JSON.stringify(event)}`);
        const data = JSON.parse(event.data);
        if (data.userId !== userId) {
          setChatData((arr) => [...arr, data]);
        }
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      });
    }

    return () => {
      if (webSocket.current !== null || webSocket.current !== {}) {
        webSocket.current.close();
        webSocket.current = null;
      }
    };
  }, [chat]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatData]);

  const submitChat = (e) => {
    let chatMessage = e.target.value;
    if (e.key === "Enter") {
      inputRef.current.value = "";
      inputRef.current.focus();
      setChat(chatMessage);
      const message = {
        user: "Me",
        userId: userId,
        message: chatMessage,
        messageId: nanoid(),
      };
      console.log(`submitChat called! ${JSON.stringify(message)}`);
      console.log(`webSocket is ${JSON.stringify(webSocket)}`);
      if (webSocket.current.value !== null) {
        console.log("Inside if webscoket not undefined");
        webSocket.current.send(JSON.stringify(message));
      }
      setChatData((arr) => [...arr, message]);
      setChat("");
    }
  };

  return (
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: "column",
        // justifyItems: "flex-end",
        border: "5px #89c2d9",
        backgroundColor: "#a9d6e5",
      }}
    >
      <div
        style={{
          display: "grid",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h3>Adithya's Chat</h3>
      </div>
      <div
        style={{
          flex: "9.75",
          overflow: "auto",
          backgroundColor: "#012a4a",
          border: "1px #89c2d9",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#232132",
          }}
        >
          <div
            style={{
              minHeight: "100vh",
            }}
          />
          {chatData.map((item) => (
            <div
              key={item.messageId}
              style={{
                margin: "5px",
              }}
            >
              <span className="userStyle">{item.user}</span>
              <span key={item.user} className="messageStyle">
                {item.message}
              </span>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </div>
      <div className="chat">
        <input
          type="text"
          placeholder="Type Message"
          className="chatBar"
          ref={inputRef}
          onKeyDown={submitChat}
        />
      </div>
    </div>
  );
}
