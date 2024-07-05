import React from "react"
import { Routes, BrowserRouter ,Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import DashBoard from "./Pages/DashBoard";
import Send from "./Pages/Send";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/dashboard" element={<DashBoard/>} />
          <Route path="/send" element={<Send/>} />
        </Routes>
      </BrowserRouter>
    </>
  
  )
}

export default App
