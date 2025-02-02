import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import usersData from "../Data/Data";

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "username";

  const handleClick = () => navigate('/');

  useEffect(() => {
    setTimeout(() => {
      const user = usersData.find(user => user.username === username);
      if (user) {
        setData(user);
      } else {
        const randomProbability = Math.random() > 0.2 ? Math.floor(Math.random() * 100) : null;
        setData(randomProbability !== null ? {
          username,
          accountAge: Math.floor(Math.random() * 1500),
          totalTweets: Math.floor(Math.random() * 5000),
          engagementRatio: (Math.random() * 200).toFixed(2),
          probability: randomProbability,
        } : null);
      }
      setLoading(false);
    }, 2000);
  }, [username]);

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-gray-400 text-lg font-poppins">Bot Detection Results</h2>
        <h1 className="text-3xl font-bold mt-2 font-poppins">User not found in database.</h1>
        <button onClick={handleClick} className="mt-6 px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-300 font-semibold flex items-center gap-2 shadow hover:shadow-lg transition-all font-poppins">
          <div className="flex gap-2 font-poppins">
            <div>Analyze Another Account?</div>
            <div><ArrowUpRight size={22} className="mt-0.5" /></div>
          </div>
        </button>
      </div>
    );
  }

  const isBot = data.probability > 50;
  const bgColor = isBot ? "bg-red-900" : "bg-green-900";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-gray-400 text-lg font-poppins">Bot Detection Results</h2>
      <h1 className="text-3xl font-bold mt-2 font-poppins">
        {loading ? "Analyzing..." : isBot ? "This account is likely a Bot." : "This account seems Human."}
      </h1>
      
      <div className="flex flex-wrap justify-center mt-8 gap-8">
        <div className="border rounded-lg p-6 w-80 text-center bg-zinc-950 border-zinc-700">
          <h3 className="text-lg font-semibold font-poppins">Prediction</h3>
          <div className={`mt-2 py-1 px-3 w-fit justify-self-center rounded-md text-sm font-instrumentsans ${bgColor}`}>
            {loading ? "Loading..." : isBot ? "Bot" : "Human"}
          </div>
          <p className="text-sm text-zinc-400 mt-4 font-instrumentsans">
            Our analysis suggests this account exhibits characteristics commonly associated with {isBot ? "automated" : "genuine"} accounts.
          </p>
          
          <div className="relative w-40 h-40 mx-auto mt-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" className="stroke-zinc-800 stroke-[6] fill-none" />
              <motion.circle cx="50" cy="50" r="45" className={`stroke-[6] rounded-3xl fill-none ${isBot ? "stroke-red-500" : "stroke-green-500"}`} strokeDasharray="283" strokeDashoffset="283" animate={{ strokeDashoffset: loading ? 283 : (283 * (1 - data.probability / 100)) }} transition={{ duration: 1.5 }} />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {loading ? "..." : `${data.probability}%`}
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-6 w-80 bg-zinc-950 border-zinc-700">
          <h3 className="text-lg font-semibold font-poppins">Account Statistics</h3>
          <p className="text-sm text-zinc-400 mt-2 font-instrumentsans">
            Analyze key account metrics to identify potential signs of automation.
          </p>
          <ul className="mt-4 text-sm space-y-2 font-instrumentsans">
            <li><strong>Username:</strong> {loading ? "Loading..." : `@${data.username}`}</li>
            <li><strong>Account Age:</strong> {loading ? "..." : `${data.accountAge} Days`}</li>
            <li><strong>Total Tweets:</strong> {loading ? "..." : data.totalTweets}</li>
            <li><strong>Engagement Ratio:</strong> {loading ? "..." : data.engagementRatio}</li>
          </ul>
        </div>
      </div>
      
      <button onClick={handleClick} className="mt-6 px-6 py-3 rounded-lg bg-white text-black hover:bg-gray-300 font-semibold flex items-center gap-2 shadow hover:shadow-lg transition-all font-poppins">
        <div className="flex gap-2 font-poppins">
          <div>Analyze Another Account?</div>
          <div><ArrowUpRight size={22} className="mt-0.5" /></div>
        </div>
      </button>
    </div>
  );
};

export default Results;
