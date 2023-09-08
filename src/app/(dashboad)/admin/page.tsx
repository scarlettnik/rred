'use client'

import OpenBlank from "@/components/quiz/OpenBlank";
import Quiz from "@/components/quiz/Quiz";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  console.log(session)
  if (session?.user) {
    return (<>
    <div>Привет, {session?.user.username || session?.user.name}</div>
    <OpenBlank/>
    </>
      
    );
  } else {
    return <div>Сначала необходимо зарегистрироваться</div>;
  }
};

export default page;
