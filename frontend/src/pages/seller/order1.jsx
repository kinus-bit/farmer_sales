import { Table , TableHeader,TableHead , TableBody , TableRow , TableCell} from "@/components/ui/table";
import SellerNavbar from "@/components/SellerNavbar";
export default function AdminOrders(){
    return(
        <div className="bg-gray-500 text-black min-h-screen">
            <SellerNavbar/>
        <h1>admin orders</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>OrderId</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>status</TableHead>
                <TableHead>Total Price</TableHead>
                </TableRow>
                
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell> 102</TableCell>
                <TableCell>12/4/2025</TableCell>
                <TableCell>Packaging</TableCell>
                <TableCell>$300</TableCell>

                </TableRow>
                <TableRow>
                    <TableCell>103</TableCell>
                <TableCell>14/9/2025</TableCell>
                <TableCell>Derivered</TableCell>
                <TableCell>$500</TableCell>

                </TableRow>
                
            </TableBody>
        </Table>
        </div>
    );

}