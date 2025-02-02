import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";

const Homepage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleClick = async () => {
    if (!username.trim()) return;

    try {
      // Send the username to the backend
    //   await axios.post("https://your-backend-url.com/api/analyze", { username });

      // Navigate to results page & pass username as state
      navigate('/analysis', { state: { username } });

    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className={`min-h-screen bg-black text-white flex flex-col items-center justify-start px-4 mt-24 md:mt-40 relative`}>
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-5xl font-semibold text-center font-poppins"
      >
        Uncover <span className="bg-gradient-to-r from-indigo-700 via-green-600 to-yellow-500 text-transparent bg-clip-text ">AI-Generated</span> <span>Content</span>
      </motion.h1>
      <p className="text-base md:text-lg text-zinc-500 mt-2 text-center max-w-md font-instrumentsans">
        Unmask the truth. Is it human or machine? Paste the link below to check the content.
      </p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-6 flex w-full max-w-md"
      >
        <input 
          type="text" 
          placeholder="Enter username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-6 py-2 rounded-l-lg bg-black border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-00 text-lg placeholder-zinc-400"
        />
        <button onClick={handleClick} className="px-4 py-2 bg-gray-200 text-black rounded-r-lg font-semibold hover:bg-gray-300 transition">
          <div className="flex gap-2 font-poppins">
            <div>Analyze</div>
            <div><ArrowUpRight size={22} className="mt-0.5" /></div>
          </div>
        </button>
      </motion.div>
    </div>
  );
};

export default Homepage;
