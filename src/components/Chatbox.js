import React, { useState } from "react";
import axios from "axios";
import "../styles/components/Chatbox.css";
import send from "../assets/social/send.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [opened, setOpened] = useState(false);
  const [start, setStart] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!start) {
      setStart(true);
      initializeChatbot();
    }
    if (!opened) {
      setOpened(true);
      document.querySelector(".chat-icon").style.display = "none";
    } else {
      setOpened(false);
      document.querySelector(".chat-icon").style.display = "block";
    }
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, sender: "user" }];
      setMessages(newMessages);
      setInputValue("");
      setTimeout(() => {
        scrollDown();
      }, 500);

      try {
        const response = await axios.post("http://localhost:5000/chat", {
          message: inputValue,
        });

        const botResponse = response.data.chatbot_response;

        console.log("Bot Response:", botResponse);

        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
        setTimeout(() => {
          scrollDown();
        }, 500);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const initializeChatbot = async () => {
    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: "iambatman",
      });

      const initialResponse = response.data.initial_response;
      console.log("Initial Response:", initialResponse);

      setMessages([...messages, { text: initialResponse, sender: "bot" }]);
      setTimeout(() => {
        scrollDown();
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollDown = () => {
    const chatBody = document.querySelector(".chat-body");
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  return (
    <div>
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <div className="chat-header" onClick={toggleChat}>
          Chat with Bella
        </div>
        {isOpen && (
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <p
                  id={msg.sender === "user" ? "MessageUser" : "MessageBot"}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              id="ChatboxInput"
              placeholder="Type a message..."
            />

            <img
              src={send}
              alt="Post Message"
              id="ChatboxSend"
              onClick={handleSend}
              type="submit"
            />
          </div>
        )}
      </div>
      <button className="chat-icon" onClick={toggleChat}>
        💬
      </button>
    </div>
  );
};

export default Chatbot;
