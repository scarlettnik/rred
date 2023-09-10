import User from "@/components/User";
import SignInForm from "@/components/form/SignInForm";
import Quiz from "@/components/quiz/Quiz";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#525252",
        color: "black",
        height: "100vh",
      }}
    >
      <SignInForm />
    </div>
  );
}
