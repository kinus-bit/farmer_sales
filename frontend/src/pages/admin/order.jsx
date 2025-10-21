import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import LoggedNavbar from "@/components/LoggedNavbar";
import API from "@/services/API";
import { useState } from "react";
import { useEffect } from "react";

export default function AdminOrders() {
    const [displayOrders, setDisplayOrders] = useState([]);

    const fetchOrders = async () => {
        const res = await API.get("/orders/getAll");
        setDisplayOrders(res.data);
    }

    useEffect(() => {
        fetchOrders();
    }, []);


    return (
        <div className="bg-gray-500 text-black min-h-screen">
            <LoggedNavbar />
            <h1>admin orders</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>productName</TableHead>
                        <TableHead>user</TableHead>
                        <TableHead>Order Date</TableHead>
                        <TableHead>quantity</TableHead>
                        <TableHead>Total Price</TableHead>
                    </TableRow>

                </TableHeader>
                <TableBody>
                   
                        {displayOrders.map((order) => (
                            <>
                             <TableRow>
                                 <TableCell>{order.productName}</TableCell>
                                <TableCell>{order.user.email}</TableCell>
                                <TableCell> {new Date(order.createdAt).toLocaleString("en-KE", {
                                    dateStyle: "full",
                                    timeStyle: "short"
                                })}</TableCell>
                                <TableCell>{order.quantity}</TableCell>
                                <TableCell>{order.totalPrice}</TableCell>
                             </TableRow>
                               
                            </>

                        )
                        )}

                   
                </TableBody>
            </Table>
        </div>
    );

}