import { React } from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "../services/API";
import { FadeLoader } from "react-spinners";
import UserNavbar from "@/components/UserNavbar";
import {Link} from 'react-router-dom';

export default function AdminProduct() {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //making counter persistent even after refreshing the page.
  const[counter ,setCounter ] = useState( () => {
    //get saved counter from localstorage on first render
    const saved = localStorage.getItem("cartCounter");
    return saved !== null ? parseInt(saved,10) : 0;
  });

  //passing counter shadows the state
  //update localstorage whenever counter changes
  const handleAddToCart = async (product) => {
    try {

      //fetch user's current cart from backend
      const res = await API.get("/orders/own");
      const cart = res.data;

      //checks if product already exists in the cart
      const existingItem = cart.find((item) => 
      
      //productId._id is because i have populated product in the order
      item.productId._id === product._id
      );

      if(existingItem){
        //if product exists, update quantity
        await API.put(`/orders/update/${existingItem._id}`,{
          quantity: existingItem.quantity + 1,
        });
      }else{
        //Else add it as a new product in the cart
        await API.post("/orders/create",{
      
      productId: product._id,
      productName: product.productName,
      productPrice: product.productPrice,
      quantity:1
      })

      }
      alert("product added to")
       
 
    } catch (error) {
      console.log("error creating an order!!!",error.message)
      
    }


    // setCounter(prev =>{
    //   const newCount = prev + 1;
    //   localStorage.setItem("cartCounter",newCount.toString());
    //   return newCount;
    // });
  };
  //loading items from database
  const load = async (req, res) => {
    try {
      setLoading(true);
      const res = await API.get("/products/all");
      setDisplayedItems(res.data);
      setAllItems(res.data);
    } catch (error) {
      setError("Failed to fetch products");
    }
    finally {
      setLoading(false);
    }
  }; 

  //fire them after loading the page
  useEffect(() => {
    load();
  }, []);

  //handle searching 
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query) {
      const filteredList = allItems.filter((item) =>
        item.productName.toLowerCase().includes(query)
      );
      if (filteredList.length > 0) {
        setDisplayedItems(filteredList);
        setError("");
      } else {
        setDisplayedItems([]);
        setError("404 - NOT FOUND");
      }
    } else {
      setDisplayedItems(allItems);
      setError("")
    }
  };

  return (
    <div className="min-h-screen">
    <UserNavbar counter={counter} />
      <div className="flex gap-2 justify-center mt-4 ">
        <div className="w-120">
          <Input
            type="text"
            placeholder="Search product"
            className=""
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button>Search</Button>
        </div>
     
      </div>
      <div className=" flex justify-start mt-5 ml-20">
        <h1 className="text-black-500 font-semibold text-2xl">products</h1>
      </div>

      <div>
        <div className="container mx-auto grid grid-cols-3 gap-2">
          {loading ? (<FadeLoader />) :
            error ? (<h2 className="text-red-500 text-2xl ">
              {error}</h2>) :
              displayedItems.length > 0 ? (
                displayedItems.map((item) => (
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
                          <div>
                            <Button >
                              <Link to="/showproduct"> see more</Link>
                             
                              {/* <ProductCard product/> */}
                            </Button></div>
                          <div><Button onClick={() => handleAddToCart(item)} >addtocart</Button></div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              ) : (
                <p className="mt-8 text-lg text-red-500">NO PRODUCTS AVAILABLE</p>

              )
          }
        </div>
      </div>
    </div>
  );
}
