import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Home from "./pages/home/Home";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { authUser } = useAuthContext()
  return (
    <div>
      <Routes> 
        <Route path="/" element={authUser ? <Home/> : <Navigate to='/signin' /> } />
        <Route path="/signin" element={authUser ? <Navigate to='/' /> : <Signin />} /> 
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <div><Toaster /></div>
    </div> 
  );
}

export default App;
