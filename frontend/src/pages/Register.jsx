import { useState } from "react";
import API from "../services/API";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  if (!formData) return alert("All input required!!")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/users/signup", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error || "Signup failed!!");
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col h-110 w-100 shadow-lg bg-gray-70 
        rounded-md p-4">
          <h1 className=" flex justify-center items-center font-bold 
          text-[25px] ">Signup</h1>
          <div className="">
            <label
              htmlFor="name"
              className="block font-semibold text-[18px] 
             mb-2">Username</label>
            <input
            name="name"
            autoComplete="off"
              type="text"
              className=" h-10 w-full focus:ring-1 
            focus:ring-blue-400 border border-gray-200 focus:border-blue-400 
            outline-none rounded-md mb-4"
            value={formData.name}
            onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-semibold text-[18px] 
            mb-2">Email</label>
            <input
            name="email"
            autoComplete="off"
              type="Email"
              className=" h-10 w-full  focus:ring-1 focus:ring-blue-400 border 
            border-gray-200 focus:border-blue-400 outline-none rounded-md mb-4"
            value={formData.email}
            onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-[18px] mb-2">Password</label>
            <input
            name="password"
            autoComplete="off"
              type="password"
              className=" h-10 w-full  focus:ring-1 focus:ring-blue-400 border
              border-gray-200 focus:border-blue-400 outline-none rounded-md mb-4"
              value={formData.password}
            onChange={handleChange}
              />
          </div>
          {loading ?(<div className="flex justify-center mb-4">
            <button className="border-blue-400 w-full h-10 bg-blue-400 rounded-md
             justify-center items-center">Signingup .....</button>
          </div>) :(<div className="flex justify-center mb-4">
            <button className="border-blue-400 w-full h-10 bg-blue-400 rounded-md
             justify-center items-center">signup</button>
          </div>)}
          
          <h3>Already  have an account?
            <Link to="/Login" className="text-blue-600">Login</Link>
          </h3>

        </form>
      </div>
    </div>
  );
}
export default Signup;
