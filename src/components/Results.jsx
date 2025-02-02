import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "username";

  const handleClick = () => {
    navigate('/'); 
  };

  useEffect(() => {
    setTimeout(() => {
      setData({
        username: "@username",
        accountAge: 455,
        followers: 4554,
        following: 7994,
        posts: 400,
        postsPerDay: 40,
        botProbability: 98, 
      });
      setLoading(false);
    }, 2000);
  }, []);

  const isBot = data?.botProbability > 50;
//   const color = isBot ? "text-red-500 border-red-500" : "text-green-500 border-green-500";
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
          <div className={`mt-2 py-1 px-3 w-fit justify-self-center rounded-md text-sm font-instrumentsans ${bgColor}`}>{loading ? "Loading..." : isBot ? "Bot" : "Human"}</div>
          <p className="text-sm text-zinc-400 mt-4 font-instrumentsans">
            Our analysis suggests this account exhibits characteristics commonly associated with {isBot ? "automated" : "genuine"} accounts.
          </p>
          
          <div className="relative w-40 h-40 mx-auto mt-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"  
                className="stroke-zinc-800 stroke-[6] fill-none"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                className={`stroke-[6] rounded-3xl fill-none ${isBot ? "stroke-red-500" : "stroke-green-500"}`}
                strokeDasharray="283"
                strokeDashoffset="283"
                animate={{ strokeDashoffset: loading ? 283 : (283 * (1 - data.botProbability / 100)) }}
                transition={{ duration: 1.5 }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {loading ? "..." : `${data.botProbability}%`}
            </span>
          </div>
        </div>

        <div className="border rounded-lg p-6 w-80 bg-zinc-950 border-zinc-700">
          <h3 className="text-lg font-semibold font-poppins">Account Statistics</h3>
          <p className="text-sm text-zinc-400 mt-2 font-instrumentsans">
            Analyze key account metrics to identify potential signs of automation.
          </p>
          <ul className="mt-4 text-sm space-y-2 font-instrumentsans">
            <li><strong>Username:</strong> {loading ? "Loading..." : `@${username}`}</li>
            <li><strong>Account Age:</strong> {loading ? "..." : `${data.accountAge} Days`}</li>
            <li><strong>Followers:</strong> {loading ? "..." : data.followers}</li>
            <li><strong>Following:</strong> {loading ? "..." : data.following}</li>
            <li><strong>Posts:</strong> {loading ? "..." : data.posts}</li>
            <li><strong>Posts per Day:</strong> {loading ? "..." : data.postsPerDay}</li>
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
