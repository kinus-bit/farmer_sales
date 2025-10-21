import { getUserRole } from "../utils/auth";
import Dashboard from "./ProductDasbboard";
import AdminDashboard from "./admin/AdminDashboard";
import SellerDashboard from "./seller/SellerDashboard";
import { Navigate } from "react-router-dom";

export default function RoleDashboard(){
    const userRole = getUserRole();

    //if no role is found,redirect to login
    if(!userRole){
        return <Navigate to="/login" replace/>
    }

    //render appropriate dashboard based on role
    switch (userRole){
        case 'admin':
            return <AdminDashboard/>;
        case 'user':
            return <Dashboard/>;
        case 'seller':
            return <SellerDashboard/>
        default:
            //if role is not recognized,redirect to login
            return <Navigate to="/login" replace/>;
    }

}