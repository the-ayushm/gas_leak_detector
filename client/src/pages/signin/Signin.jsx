import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSignin from "../../hooks/useSignin";

function Signin() {
//   const history = useHistory();  // React Router use kar rahe hain page navigate karne ke liye
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const {signin} = useSignin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signin(formData)   
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Gas Detector Device Signin 
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email Adress</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="9876543210"
            />
          </div>
          
         
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your Password"
            />
          </div>
          
          <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" >
                        Don't have an account?
                    </Link> 

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300"
          >
            Sign In
          </button>
        </form>
    </div>
    </div>
  );
}

export default Signin; 
