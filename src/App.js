import "./App.css";
import { NavBar } from "./components/NavBar";
import { HomePage } from './pages/HomePage';
import { OurSolution } from './pages/OurSolution';
import { Footer } from './components/Footer';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        <Route exact path="/oursolution" element={<OurSolution/>}/>
      </Routes>
      <Footer />
    </div>
  );
}


export default App;
