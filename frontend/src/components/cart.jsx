import { useState, useEffect } from "react";
import API from "@/services/API";
export default function Cart() {
    const [displayOrder, setDisplayOrder] = useState([]);


    const fetchOrders = async () => {
        try {
            const res = await API.get("/orders/own")
            setDisplayOrder(res.data);
            console.log(res.data);
        } catch (error) {
            console.log("Failed to fetch order:", error.message)
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [])

    const handleUpdateQuantity = async (order, newQuantity) => {
        try {
            //do not allow 0 or negative quantity
            if (newQuantity < 1) {
                //delete an order if less than 1
                await API.delete(`/orders/deleteown/${order._id}`)
                setDisplayOrder((prev) => prev.filter((item) =>
                    item._id !==order._id
                ));
                //stop execution of next statement
                return;
            }
            //update in backend
            await API.put(`/orders/update/${order._id}`, { quantity: newQuantity, totalPrice: newQuantity * order.productPrice })

            //update quantity infrontend state without refreshing
            setDisplayOrder((prev) =>
                prev.map((item) =>
                    item._id === order._id ? { ...item, quantity: newQuantity, totalPrice: newQuantity * order.productPrice } : item
                )
            );
        } catch (error) {
            console.error("error updating quantity:", error.message);
        }
    }

    // Compute total price of all products in the cart
    //reduce - combines all element of an array into a single value
    //tekes two parameters-callbackfunction ,initial value
    //acc -keep track of the running total as reduce loops
    const totalPrice = displayOrder.reduce((acc, order) => {
        return acc + order.productPrice * order.quantity;
    }, 0);

    return (
        <div className="min-h-screen grid grid-cols-2 relative   ">
            <div>
                <h1 className="ml-3 fixed  w-full bg-zinc-50 top-0 text-[35px] font-bold">My Cart</h1>
                <hr />
                <div className="w-full mt-10">
                    {displayOrder.map((order) => (
                        <div key={order._id}>
                            <div className=" grid grid-cols-3 ">
                                <div className="flex bg-zinc-200 size-32 ml-5 m-3">
                                    <img src={order.productId.productUrl} alt="image" className="object-cover rounded-md w-full" />
                                </div>
                                <div className="flex flex-col justify-center items-center colspan-2">
                                    <p className="font-bold">price: ${order.productPrice}</p>
                                    <p>{order.productName}</p>
                                    <p>{order.productId.productDescription}</p>
                                    <p>Quantity:
                                        <button
                                            className="border-2 p-2 bg-red-400 rounded-md"
                                            onClick={() => handleUpdateQuantity(order, order.quantity - 1)}
                                            // disabled={order.quantity <= 1}
                                        >-</button>
                                        <span className="p-3">
                                            {order.quantity}
                                        </span>
                                        <button
                                            className="border-2 p-2 bg-green-400 rounded-md"
                                            onClick={() => handleUpdateQuantity(order, order.quantity + 1)}
                                        >+</button>
                                    </p>
                                    <p className="font-bold">Total: ${order.totalPrice}</p>
                                </div>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>

            </div>
            <div className=" absolute fixed right-0 shadow-md h-full flex w-120 justify-center items-center ">
                <div className="">
                    <h2 className="flex justify-center items-center font-bold text-[30px]">Total</h2>

                    <div className="flex mb-10">
                        <h2 className="font-bold text-[20px]">subtotal</h2>
                        <p className="flex w-full justify-around font-semibold ">${totalPrice}</p>
                    </div>
                    <div className="flex w-full">
                        <h2 className="font-bold text-[20px]">Delivery</h2>
                        <p className="flex w-full justify-around font-semibold">(free)</p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="flex w-70 border rounded-md justify-center items-center p-2 bg-green-400 font-semibold m-4">Checkout</button>
                    </div>
                    <div>
                        <p className="font-bold text-[20px]">We accept:</p>
                        <div className="flex space-x-6">
                            <p className="border p-3 m-3 rounded-md bg-green-200 font-semibold">mpesa</p>
                            <p className="border p-3 m-3 rounded-md bg-blue-800 text-zinc-400 font-semibold">paypal</p>
                            <p className="border p-3 m-3 rounded-md bg-black  text-white font-semibold">grey</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

