import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from './ui/button';

export default function Navigation() {
  return (
    <nav className="  w-full bg-white shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between ">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600">MyStore</h1>

        {/* Nav Links */}
        <NavigationMenu className="hidden md:block ">
          <NavigationMenuList className="flex space-x-6 ">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/"
                  className="text-xl font-semibold text-gray-700 hover:text-blue-600 transition"
                >
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/about"
                  className= "text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/feedback"
                  className=" text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  Feedback
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/contact"
                  className=" text-xl font-semibold text-gray-700 hover:text-blue-600 transition "
                >
                  Contacts
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex space-x-3">
          <Button>
            <Link to="/register">signup</Link>
          </Button>
           <Button>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
