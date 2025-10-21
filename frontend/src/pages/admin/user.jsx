import { useState, useEffect } from "react";
import { getUserRole } from "@/utils/auth";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
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
import API from "@/services/API";
import { Button } from "@/components/ui/button";
import LoggedNavbar from "@/components/LoggedNavbar";
import { Input } from "@/components/ui/input";
const User = () => {
    const[user, setUser] = useState([]);
    const[editingRole , setEditingRole] = useState(null);
    const[openDialog , setOpenDialog] = useState(false);
    const userRole = getUserRole();

    useEffect(() => {
        if (userRole === "admin") {
            const fetchUsers = async () => {
                const res = await API.get("/users/getAll");
                setUser(res.data);
                console.log(res.data);
            };
            fetchUsers();

           

        }
    }, [userRole]);

    
         //updating user role
            const  updateRole = async (id , payload ) =>{
                await API.put(`users/update/${id}`,payload);
            };

            const deleteRole = async(id) =>{
                await API.delete(`users/delete/${id}`);
                setUser((prev) => prev.filter((t) => t._id !== id));

            } 
  

    //handling editing role
    const handleEditingRole = (e) =>{
        const {name,value} = e.target;
        setEditingRole((prevItems) =>({
            ...prevItems,
            [name]:value  
        }))
    };

    //handle saving role
    const HandleSaveRole = async (e) => {
        e.preventDefault();
        if (!editingRole) return;
        await updateRole(editingRole._id, editingRole);
        setUser((prevUsers) => 
            prevUsers.map((person) => 
                person._id === editingRole._id ? editingRole : person
            )
        );
        setEditingRole(null);
        setOpenDialog(false);
    }

    if (!userRole) {
        return <h1 className="text-red-500 text-lg">NOT AUTHORIZED</h1>
    }
    if (userRole !== "admin") {
        return <h1 className="bg-black text-white text-lg flex justify-center min-h-screen items-center ">NOT AUTHORIZED</h1>
    }

    return (
        <div className="min-h-screen">
            <LoggedNavbar />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {user.map((person) => (
                        <TableRow key={person._id}>
                            <TableCell>{person.name}</TableCell>
                            <TableCell>{person.email}</TableCell>
                            <TableCell>{person.role}</TableCell>
                            <TableCell>
                                <Dialog 
                                open={openDialog}
                                onOpenChange={setOpenDialog}
                                >
                                    <DialogTrigger>
                                        <Button onClick={() => setEditingRole(person)} >UpdateRole</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <form onSubmit={HandleSaveRole}>
                                            <DialogHeader>
                                                <DialogTitle>Updating user Role</DialogTitle>
                                                <DialogDescription>
                                                    You are about to update user role
                                                </DialogDescription>
                                            </DialogHeader>
                                            <label htmlFor="Role">Role</label>
                                            <Input 
                                            name="role"
                                            value={editingRole?.role || " "}
                                            onChange={handleEditingRole}/>
                                            <DialogFooter>
                                                <DialogClose>
                                                    Cancel
                                                </DialogClose>
                                                <Button type="submit" onClick={HandleSaveRole}>Save</Button>
                                            </DialogFooter>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                            <TableCell>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button>DELETE</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Deleting user
                                            </DialogTitle>
                                            <DialogDescription>
                                                You are sure to delete {person.name}?
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose>
                                                Cancel
                                            </DialogClose>
                                            <Button onClick={ () => deleteRole(person._id)}>DELETE</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </div>
    );
}

export default User;
