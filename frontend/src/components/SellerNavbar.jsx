import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from './ui/button';

export default function Navigation() {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>

        {/* Nav Links */}
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-6 ">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/sellerhome"
                  className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  Dashboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/sellerproduct"
                  className=" text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  Products
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/sellerorder"
                  className=" text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  Orders
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

              <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/users"
                  className=" text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  Users
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>

          
        </NavigationMenu>

        
        <div className="flex space-x-3">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </nav>
  );
}
