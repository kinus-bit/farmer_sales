import { React } from 'react'
import { Card ,CardHeader,CardTitle,CardContent,CardFooter } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import LoggedNavbar from '@/components/LoggedNavbar';
import API from '@/services/API';

export default function AdminDashboard(){

    return(
        <>
        <LoggedNavbar/>
        <h1 className="text-3xl font-bold text-center  ">Welcome Back Admin!</h1>
        <p>orders</p>
        <div className="flex space-x-6 justify-center" >
            <div>
                <Card className="flex h-48 w-48">
                    <CardHeader>
                        <CardTitle>:</CardTitle>
                    </CardHeader>
                    <CardContent>All orders</CardContent>
                    <CardFooter>5</CardFooter>
                </Card>

                
            </div>
            <div>
                <Card className="flex h-48 w-48">
                    <CardHeader>
                        <CardTitle>:</CardTitle>
                    </CardHeader>
                    <CardContent>Packaging</CardContent>
                    <CardContent>
                        <Progress value={33}/>
                    </CardContent>

                    <CardFooter>2</CardFooter>
                </Card>

            </div>
            <div>
                <Card className="flex h-48 w-48">
                    <CardHeader>
                        <CardTitle>:</CardTitle>
                    </CardHeader>
                    <CardContent>Delivered</CardContent>
                    <CardContent>
                        <Progress value={55}/>
                    </CardContent>
                    <CardFooter>4</CardFooter>
                </Card>

            </div>
            <div>
                <Card className="flex h-48 w-48">
                    <CardHeader>
                        <CardTitle>:</CardTitle>
                    </CardHeader>
                    <CardContent>completed</CardContent>
                    <CardContent>
                        <Progress value={75}/>
                    </CardContent>
                    <CardFooter>1</CardFooter>
                </Card>

            </div>
        </div>
        <div className="grid grid-cols-2 space-x-6 mt-10 mb-10">
            <div>
                <Card className="flex h-50 ">
                    <CardHeader>
                        <CardTitle>order status</CardTitle>
                    </CardHeader>
                    <CardContent>completed</CardContent>
                    
                </Card>
            </div>
            <div>
                <Card className="flex h-50 ">
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                    </CardHeader>
                    <CardContent>completed</CardContent>
                </Card>
            </div>
        </div>

        </>
    );
}