import {useState} from "react";
import { Link } from "react-router-dom";
import { Button } from './ui/button';
import { HiShoppingCart } from "react-icons/hi";

export default function Navigation({counter}) {
 
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600">MyStore</h1> 
        <div className="flex w-full justify-end space-x-6">
          <div className="relative mt-1">
            <Link to="/mycart">
             <HiShoppingCart className="size-12" />
            </Link>
            <div className=" flex absolute -top-4 -right-2 size-5 items-center justify-center rounded-[50%] bg-red-700 text-blue"> {counter}</div>
          </div>
           
          <Button className=""onClick={logout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}
