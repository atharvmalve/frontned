import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from "./context/ThemeContext";
import Homepage from './components/Homepage';
import Results from './components/Results';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  const { theme } = useTheme();
  return (
    <Router>
      <div className={`flex flex-col h-screen overflow-hidden w-fit md:w-auto ${theme}  bg-gray-100 dark:bg-black text-gray-900 dark:text-white`}>
        <Navbar />  
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/analysis" element={<Results />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
