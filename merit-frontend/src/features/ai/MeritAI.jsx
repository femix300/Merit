import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const MeritAI = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { text: message, sender: "user" };
    setChat((prevChat) => [...prevChat, userMessage]);
    
    // Clear input field
    setMessage("");
    
    // Set loading state
    setLoading(true);
    
    try {
      // Send message to backend
      const response = await axios.post(`${BASE_URL}/chat`, {
        message: userMessage.text,
      });
      
      // Add AI response to chat
      const aiMessage = { 
        text: response.data.response || "Sorry, I couldn't process that request.", 
        sender: "ai" 
      };
      setChat((prevChat) => [...prevChat, aiMessage]);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      // Add error message to chat
      const errorMessage = { 
        text: "Sorry, there was an error processing your request. Please try again.", 
        sender: "ai" 
      };
      setChat((prevChat) => [...prevChat, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-[80vh] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Merit <span className="text-yellow-500">AI</span> Assistant
        </h1>
        <p className="text-gray-600">
          Ask me anything about university admissions, course requirements, or aggregate scores.
        </p>
      </motion.div>

      {/* Chat display area */}
      <div className="flex-grow overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg shadow">
        {chat.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <p>Start a conversation with Merit AI</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chat.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-200 text-gray-800 p-3 rounded-lg max-w-[80%] flex space-x-2"
              >
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask Merit AI..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MeritAI; 