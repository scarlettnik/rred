'use client'

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import LeftPart from "@/components/abminPage/LeftPart"; 
import CreateBlank from "@/components/abminPage/CreateBlank";
import CreateQuiz from "@/components/abminPage/CreateQuiz";
export default function Page() {
  const { data: session } = useSession();
  const [view, setView] = useState();

  if (session?.user) {
    return (<><div style={{color: "pink"}}><LeftPart
    view={view}
    setView={setView}
  />
  {view === "blank" && (
    <CreateBlank
      setView={setView}
    />
  )}
  {view === "quiz" && (
    <CreateQuiz
      setView={setView}
    />
  )}</div></>);
  } else {
    return <div>Сначала необходимо зарегистрироваться</div>;
  }
};
// <div>Привет, {session?.user.username || session?.user.name}</div>