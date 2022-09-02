import React, { useState, useRef } from "react";

export default function ChatInput() {
  const [chatData, setChatData] = useState("");
  const inputRef = useRef(null);

  const submitChat = () => {
    console.log("submitChat called!", chatData);
    inputRef.current.value = "";
    inputRef.current.focus();
    setChatData("");
  };

  return (
    <div className="chat">
      <input
        type="text"
        className="chatBar"
        onBlur={(e) => {
          setChatData(e.target.value);
        }}
      />
      <button
        //   onClick={() => {
        //     inputRef.current.value = "";
        //     inputRef.current.focus();
        //     setChatData("");
        //   }}
        onClick={submitChat}
      >
        Send
      </button>
    </div>
  );
}
