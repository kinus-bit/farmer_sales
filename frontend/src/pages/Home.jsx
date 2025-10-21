import { React } from "react";
import { useState,useEffect} from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import API from "@/services/API";
import Navigation from "@/components/Navigation";

export default function Home() {

  const [displayedItems, setDisplayedItems] = useState([]);

  const load = async () => {
      const res = await API.get("/products/all");
      setDisplayedItems(res.data);
      
    };
  
    useEffect(() => {
      load();
    }, []);
  return (
    <div className="min-h-screen">
    <Navigation/>
      <div className="flex justify-around">
        <div className="">
          <h1 className="text-[30px]">latest <span className="collapse md:visible">collection</span></h1>
        </div>
        <div>
          <h1 className="text-[30px]"><span className="collapse md:visible">see </span> more</h1>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:flex space-y-6 md:space-x-6 mt-3 mb-3 justify-center items-center">
       
          {displayedItems.slice(0,3).map((item) => (
            <div key={item._id}>
              <Card className="flex h-80 w-80 p-0">
                <CardContent className="p-0">
                  <img
                    src={item.productUrl}
                    className="h-80 w-full object-cover object-center rounded-md"
                  ></img>
                </CardContent>
              </Card>
            </div>
          ))}
       
      </div>

      <div className="flex justify-around ">
        <div className="">
          <h1 className=" text-[30px]  md:text-[30px] "><span className="collapse md:visible">Top </span>Products</h1>
        </div>
        <div>
          <h1 className="text-[30px]"><span className="collapse md:visible">see </span> more</h1>
        </div>
      </div>
      <div className=" flex flex-col md:flex-row md:flex space-y-6 md:space-x-6 mt-3 mb-3 justify-center items-center">
       
          {displayedItems.slice(4).map((item) => (
            <div key={item._id}>
              <Card className="flex h-80 w-80 p-0">
                <CardContent className="p-0">
                  <img
                    src={item.productUrl}
                    className="h-48 w-full object-cover object-bottom  rounded-md"
                  ></img>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <p>{item.productName}</p>
                  <p>${item.productPrice}</p>
                  <Button>see product</Button>
                </CardFooter>
              </Card>
            </div>
          ))}
       
      </div>
   </div>
  );
}
