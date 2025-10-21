import { useState } from "react";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/users/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    
      
    } catch (error) {
      setError(error || "Login failed!!");
      alert("Login failed");
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div>
       <div className="flex justify-center items-center min-h-screen">
        <form  onSubmit={handleSubmit} className="flex flex-col h-90 w-100 shadow-lg bg-gray-70 rounded-md p-4">
          <h1 className=" flex justify-center items-center font-bold text-[25px] ">Login</h1>
           <div>
            <label htmlFor="email" className="block font-semibold text-[18px] mb-2">Email</label>
            <input type="email" autoComplete="off" name="email" value={formData.email} onChange={handleChange} className=" h-10 w-full  focus:ring-1 focus:ring-blue-400 border border-gray-200 focus:border-blue-400 outline-none rounded-md mb-4"/>
          </div>
           <div className="mb-4">
            <label htmlFor="password" className="block font-semibold text-[18px] mb-2">Password</label>
            <input type="password" autoComplete="off"  name="password" value={formData.password} onChange={handleChange} className=" h-10 w-full  focus:ring-1 focus:ring-blue-400 border border-gray-200 focus:border-blue-400 outline-none rounded-md mb-4"/>
          </div>
         {loading ?(<div className="flex justify-center mb-4">
            <button className="border-blue-400 w-full h-10 bg-blue-400 rounded-md
             justify-center items-center">loggingin .....</button>
          </div>) :(<div className="flex justify-center mb-4">
            <button className="border-blue-400 w-full h-10 bg-blue-400 rounded-md
             justify-center items-center">login</button>
          </div>)}
          <h3>Don't have an account?
            <Link to="/Register" className="text-blue-600">create account</Link>
          </h3>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
