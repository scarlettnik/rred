

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogOut from "./LogOut";
import Icon from './ui/icon'


const Navbar = async () => {
  
  const session = await getServerSession(authOptions);
  return (
    <div style={{background:"#1C1C1C", position: "relative", padding:"2rem"}} className="p-10 fixed w-full">
      <div className="flex justify-between ">
        <Link href="/">
       
   <Icon/>
        </Link>
        {session?.user ? (
          <LogOut />
        ) : (
          <Link  style={{backgroundColor:"#ccff00", color:"black"}} className={buttonVariants()} href="/sign-in">
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
