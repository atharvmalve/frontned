// import { useState } from "react";
// import { useTheme } from "../context/ThemeContext";
import {  Github,} from "lucide-react";
// import { Sun, Moon, Github,} from "lucide-react";

function Navbar() {
    // const [darkMode, setDarkMode] = useState(true);
    // const { theme, toggleTheme } = useTheme();
  return (
    <div className='flex h-16  bg-zinc-950 '>
        <div className="absolute top-4 left-4 text-lg font-semibold font-poppins">Bot Detection Model</div>
        <div className="absolute top-4 right-4 flex gap-4">
            {/* <button onClick={toggleTheme} >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button> */}
            <a href="https://github.com/Heartking-2324/PS1_iitk_part2" target="_blank" rel="noopener noreferrer">
            <Github size={24} />
            </a>
        </div>
    </div>
  )
}

export default Navbar;
