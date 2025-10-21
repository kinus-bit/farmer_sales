import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


import API from "@/services/API";
import { useState,useEffect } from "react";
const ProductCard = () =>{
    const[products,setProducts] = useState([]);
    const fetchProduct = async() =>{
        const res = await API.get("/products/all");
        setProducts(res.data);
    }
    useEffect(() => {
        fetchProduct();
    },[]);
    return(
        <>
        {products.map((item) =>
         <div key={item._id}>
                    <Card className="flex h-90 w-full p-0">
                      <CardContent className="p-0">
                        <img
                          src={item.productUrl}
                          className="h-55 w-full object-cover rounded-md"
                        ></img>
                      </CardContent>
                      <CardFooter className="flex flex-col">
                        <p>{item.productName}</p>
                        <p>${item.productPrice}</p>
                        <div className="flex w-full justify-around">
                          <div><Button onClick={() => handleAddToCart(item)} >addtocart</Button></div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
        )}
        
        </>
    );
}
export default ProductCard;