import Dashboard from "./pages/dashboard"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { BrowserRouter, Routes, Route } from "react-router-dom";    

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  </BrowserRouter>
}

export default App;
