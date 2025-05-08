import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useSignUp from "../../hooks/useSignup";

function Signup() {
//   const history = useHistory();  // React Router use kar rahe hain page navigate karne ke liye
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    sensorId: "",
    password: "",
    confirmPassword: "", 
  });
  const {signup} = useSignUp();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    await signup(formData)   
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Gas Detector Device Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
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
            <label className="block mb-1 font-medium text-gray-700">Sensor ID</label>
            <input
              type="text"
              name="sensorId"
              value={formData.sensorId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="eg: esp32_home_001"
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
              placeholder="Create a strong password"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">ConfirmPassword</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword} 
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a strong password"
            />
          </div>
          <Link to="/signin" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block" >
                        Already have an account?
                    </Link>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-300"
          >
            Register Device
          </button>
        </form>
    </div>
    </div>
  );
}

export default Signup;
