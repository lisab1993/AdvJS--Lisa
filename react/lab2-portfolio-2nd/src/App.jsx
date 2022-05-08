import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Contact from "./components/Contact";

const App = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-black to-zinc-600">
        <Header />
        <Contact />
      </div>

      <Home />
    </>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
