import User from "@/components/User";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <div>
    <h1>Home</h1>
    <Link href='/admin' className={buttonVariants()}>Админка </Link>
    <User/>
  </div>;
}
