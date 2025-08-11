import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/components/Chatbox.css";
import send from "../assets/social/send.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [opened, setOpened] = useState(false);
  const [start, setStart] = useState(false);
  const chatBodyRef = useRef(null);
  const chatIconRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (!start) {
      setStart(true);
      initializeChatbot();
    }

    setOpened(!opened);

    // Use ref instead of querySelector for better React practice
    if (chatIconRef.current) {
      chatIconRef.current.style.display = opened ? "block" : "none";
    }
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const newMessages = [...messages, { text: inputValue, sender: "user" }];
      setMessages(newMessages);
      setInputValue("");

      // Wait for state update and then scroll
      setTimeout(() => {
        scrollDown();
      }, 100);

      try {
        const response = await axios.post("http://localhost:5000/chat", {
          message: inputValue,
        });

        const botResponse = response.data.chatbot_response;
        console.log("Bot Response:", botResponse);

        setMessages([...newMessages, { text: botResponse, sender: "bot" }]);

        // Scroll after bot response
        setTimeout(() => {
          scrollDown();
        }, 100);
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

      setMessages([{ text: initialResponse, sender: "bot" }]);

      setTimeout(() => {
        scrollDown();
      }, 100);
    } catch (error) {
      console.error("Error initializing chatbot:", error);
    }
  };

  const scrollDown = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  // Effect to scroll down when messages change
  useEffect(() => {
    scrollDown();
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className={`chatbot ${isOpen ? "open" : ""}`}>
        <div className="chat-header" onClick={toggleChat}>
          Chat with Bella
        </div>
        {isOpen && (
          <div className="chat-body" ref={chatBodyRef}>
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <p
                    id={msg.sender === "user" ? "MessageUser" : "MessageBot"}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ))}
            </div>
            <div className="chat-input-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                id="ChatboxInput"
                placeholder="Type a message..."
                aria-label="Chat message input"
              />
              <button
                className="send-button"
                onClick={handleSend}
                aria-label="Send message"
              >
                <img src={send} alt="Send" id="ChatboxSend" />
              </button>
            </div>
          </div>
        )}
      </div>
      <button
        className="chat-icon"
        onClick={toggleChat}
        ref={chatIconRef}
        aria-label="Open chat"
      >
        💬
      </button>
    </div>
  );
};

export default Chatbot;
