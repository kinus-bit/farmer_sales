import { React } from "react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import API from "@/services/API";
import { FadeLoader } from "react-spinners";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import LoggedNavbar from "@/components/LoggedNavbar";

export default function AdminProduct() {
  //initial state of new product
  const initialProductState = {
    productUrl: "",
    productName: "",
    productDescription: "",
    productPrice: "",
  };

  const [newproduct, setNewProduct] = useState(initialProductState);
  //current displayed list
  const [displayedItems, setDisplayedItems] = useState([]);
  //full list(never touched)
  const [allItems, setAllItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isCreateDilaogOpen, setIsCreateDilaogOpen] = useState(false);
  const [isUpdateDilaogOpen, setIsUpdateDilaogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //fetch product from backend
  const load = async () => {
    try {
      setLoading(true)
      const res = await API.get("/products/all");
      setDisplayedItems(res.data);
      setAllItems(res.data);
      setError("");

    } catch (error) {
      setError("Failed to fetch products")
    }
    finally{
      setLoading(false);
    }

  }
  //display products after loading the page
  useEffect(() => {
    load();
  }, []);

  //create new product
  const createProduct = async (payload) => {
    try {
      const res = await API.post("/products/create", payload);
      setDisplayedItems((prev) => [res.data, ...prev]);
    } catch (error) {
      console.error("could not create product:",error);
    }
  };

  //update product
  const updateProduct = async (id, payload) => {
    await API.put(`products/update/${id}`, payload);
  };

  //delete product
  const deleteProduct = async (id) => {
    try {
      await API.delete(`products/delete/${id}`);
      setDisplayedItems((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log("Could not delete the product:",error)
    }
  };

  //handle editing/updating a product(in the dialog)
  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditingItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  }

  //handles save after update
  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    await updateProduct(editingItem._id, editingItem);
    setDisplayedItems((prevItems) =>
      prevItems.map((item) =>
        item._id === editingItem._id ? editingItem : item
      )
    );
    setEditingItem(null);
    setIsUpdateDilaogOpen(false);
  };

  //handles creation of a new product
  function handleNewProductChange(e) {
    const { value, name } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handles searching a product
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.value.toLowerCase();
    if (query) {
      //filter from original list
      const filteredList = allItems.filter((item) =>
        item.productName.toLowerCase().includes(query)
      );
      setDisplayedItems(filteredList);
      if (filteredList.length > 0) {
        setDisplayedItems(filteredList);
        setError("");
      } else {
        setDisplayedItems([]);
        setError("404 - NOT FOUND");
      }
    }
    else {
      //restore full list if input is cleared(using displayItems 
      // brings error because up there we have filtered DisplayItems 
      //and we can't go back
      setDisplayedItems(allItems);
      setError("");
    }
  };

  //handles submition of new created product
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    await createProduct(newproduct);
    setNewProduct(initialProductState);
    setIsCreateDilaogOpen(false);
  };

  return (
    <div className="min-h-screen">
      <LoggedNavbar/>
      <div className="flex gap-2 justify-center mt-4">
        <div className="w-120">
          <Input
            type="text"
            placeholder="Search product"
            className=""
            onChange={handleSearch}
          />
        </div>
        <div>
          <Button type="submit" onSubmit={handleSearch}>Search</Button>
        </div>
      </div>
      <div className=" flex justify-around mt-5 mb-5">
        <h1 className="text-3xl font-semibold">products</h1>
        <Dialog open={isCreateDilaogOpen} onOpenChange={setIsCreateDilaogOpen}>
          <DialogTrigger asChild>
            <Button>Add product</Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={handleCreateSubmit}>
              <DialogHeader>
                <DialogTitle>create new product</DialogTitle>
                <DialogDescription>
                  you are about to update the product
                </DialogDescription>
              </DialogHeader>
              <div>
                <Label>productUrl</Label>
                <Input
                  name="productUrl"
                  value={newproduct.productUrl}
                  onChange={handleNewProductChange}
                />
              </div>
              <div>
                <Label>productName</Label>
                <Input
                  name="productName"
                  value={newproduct.productName}
                  onChange={handleNewProductChange}
                />
              </div>
              <div>
                <Label>productDescription</Label>
                <Input
                  name="productDescription"
                  value={newproduct.productDescription}
                  onChange={handleNewProductChange}
                />
              </div>
              <div>
                <Label>productPrice</Label>
                <Input
                  name="productPrice"
                  value={newproduct.productPrice}
                  onChange={handleNewProductChange}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <div className=" container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {loading ? (<FadeLoader className="justify-center items-center min-h-screen" />) :
            error ? (<h2 className="text-red-500 text-2xl">{error}</h2>) :
              displayedItems.length > 0 ? (
                displayedItems.map((item) => (
                  <div key={item._id}>
                    <Card className="flex h-90 w-full p-0">
                      <CardContent className="p-0">
                        <img
                          src={item.productUrl}
                          className="h-55 w-full object-cover scale-3/2 object-center rounded-md"
                        ></img>
                      </CardContent>
                      <CardFooter className="flex flex-col">
                        <p>{item.productName}</p>
                        <p>${item.productPrice}</p>
                        <div className="flex space-x-11 h-20 w-20 mt-2">
                          <Dialog
                            open={isUpdateDilaogOpen}
                            onOpenChange={setIsUpdateDilaogOpen}
                          >
                            <form onSubmit={handleSaveUpdate}>
                              <DialogTrigger asChild>
                                <Button onClick={() => setEditingItem(item)}>
                                  Update
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Update product</DialogTitle>
                                  <DialogDescription>
                                    you are about to update the product
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <Label>productUrl</Label>
                                  <Input
                                    name="productUrl"
                                    value={editingItem?.productUrl || ""}
                                    onChange={handleEditChange}
                                  />
                                </div>
                                <div>
                                  <Label>productName</Label>
                                  <Input
                                    name="productName"
                                    value={editingItem?.productName || ""}
                                    onChange={handleEditChange}
                                  />
                                </div>
                                <div>
                                  <Label>productDescription</Label>
                                  <Input
                                    name="productDescription"
                                    value={editingItem?.productDescription || ""}
                                    onChange={handleEditChange}
                                  />
                                </div>
                                <div>
                                  <Label>productUrl</Label>
                                  <Input
                                    name="productPrice"
                                    value={editingItem?.productPrice || ""}
                                    onChange={handleEditChange}
                                  />
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button>cancel</Button>
                                  </DialogClose>
                                  <Button type="submit" onClick={handleSaveUpdate}>
                                    Save
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </form>
                          </Dialog>
                          <Button onClick={() => deleteProduct(item._id)}>
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              ) : (<h1>No product Found</h1>)
          }
        </div>
      </div>
    </div>
  );
}
