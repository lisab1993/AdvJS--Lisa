import { setGlobal, addCallback } from "reactn"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
 
function App() {

  const rehydrateState = () => {
    const state = localStorage.getItem("globalState")
    if (state) return JSON.parse(state)

    return {
      token: null
    }
  }

  setGlobal(rehydrateState())

  addCallback(state => {
    localStorage.setItem("globalState", JSON.stringify(state))
  })

  return (
    <Router>
      Hello World
      <Routes>
        <Route path="/"/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/profile" />
        <Route path="*" />
      </Routes>
    </Router>
  );
}

export default App;
