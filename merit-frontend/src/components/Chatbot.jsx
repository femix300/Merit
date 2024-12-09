import React, { useState } from 'react'
import { motion } from "framer-motion";
function Chatbot() {
        const [isVisible, setIsVisible] = useState(false);

        return (
          <div className="fixed bottom-8 right-8">
            <motion.div
              animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
              initial={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg p-4 max-w-xs"
              style={{ display: isVisible ? "block" : "none" }}
            >
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-800">
                  👋 Hi there! I'm your assistant. How can I help you with your admission process today?
                </p>
                <button
                  onClick={() => setIsVisible(false)}
                  className="self-end text-blue-600 text-sm hover:underline"
                >
                  Close
                </button>
              </div>
            </motion.div>
            <motion.button
              onClick={() => setIsVisible(!isVisible)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-[#5c48ee] text-white p-4 rounded-full shadow-lg focus:outline-none"
            >
              💬
            </motion.button>
          </div>
        );
};


export default Chatbot