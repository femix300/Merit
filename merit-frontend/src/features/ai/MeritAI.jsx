import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";

const MeritAI = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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
      // Send message to backend using the centralized API service
      const response = await api.sendChatMessage(userMessage.text);
      
      // Add AI response to chat
      const aiMessage = { 
        text: response?.response || "Sorry, I couldn't process that request.", 
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 font-display mb-4">
          Merit <span className="text-primary-600">AI</span> Assistant
        </h1>
        <p className="text-neutral-600 max-w-2xl mx-auto">
          Ask anything about universities, courses, admission requirements, or career paths and get instant, accurate answers.
        </p>
      </div>

      {/* Chat window */}
      <div className="flex-grow bg-white rounded-xl shadow-card overflow-hidden flex flex-col mb-6 border border-neutral-200">
        <div className="p-3 bg-neutral-50 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-error-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-accent-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
            <div className="mx-auto text-center text-sm text-neutral-500 font-medium">Merit AI Chat</div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 max-h-[500px] min-h-[300px]">
          {chat.length === 0 ? (
            <div className="flex h-full items-center justify-center text-neutral-400">
              <div className="text-center max-w-sm">
                <div className="bg-primary-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="mb-2">Ask anything about universities, admissions, or courses.</p>
                <p className="text-sm opacity-70">I'm here to help you make informed decisions about your academic journey.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {chat.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-xl px-4 py-3 ${
                        msg.sender === "user"
                          ? "bg-primary-600 text-white rounded-tr-none"
                          : "bg-neutral-100 text-neutral-800 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-neutral-100 text-neutral-800 p-3 rounded-xl rounded-tl-none max-w-[85%] flex space-x-2">
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input form with modern styling */}
        <div className="p-4 border-t border-neutral-200">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask Merit AI..."
                className="w-full py-3 px-4 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !message.trim()}
              className="bg-primary-600 text-white px-5 py-3 rounded-lg hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Features section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          {
            title: "Course Information",
            description: "Ask about specific courses, requirements, and career prospects.",
            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          },
          {
            title: "Admission Guidance",
            description: "Get insights on admission processes and requirements.",
            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          },
          {
            title: "Career Advice",
            description: "Explore career paths related to your educational interests.",
            icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          }
        ].map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 * index }}
            className="bg-white p-5 rounded-xl shadow-sm border border-neutral-200 hover:shadow-md transition-shadow"
          >
            <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
              </svg>
            </div>
            <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
            <p className="text-neutral-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ section */}
      <div className="bg-neutral-50 rounded-xl p-6 border border-neutral-200 mb-12">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "How accurate is Merit AI?", a: "Merit AI is trained on comprehensive educational data from Nigerian universities, achieving over 95% accuracy in answering admission-related queries." },
            { q: "Can Merit AI calculate my aggregate score?", a: "Yes, simply provide your JAMB score and O-level grades, and Merit AI can calculate your aggregate score for specific universities." },
            { q: "Does Merit AI provide course recommendations?", a: "Absolutely! Merit AI can suggest alternative courses based on your scores and interests if you don't meet requirements for your first choice." }
          ].map((faq, index) => (
            <div key={index} className="border-b border-neutral-200 pb-4 last:border-0 last:pb-0">
              <h3 className="font-medium mb-2">{faq.q}</h3>
              <p className="text-neutral-600 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MeritAI; 