'use client'

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import LeftPart from "@/components/abminPage/LeftPart";
import CreateBlank from "@/components/abminPage/CreateBlank";
import CreateQuiz from "@/components/abminPage/CreateQuiz";
import HomeAdmin from '../../../components/abminPage/HomeAdmin'
import styled from "styled-components";
import Test from "../../../components/quiz/test"

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const LeftContent = styled.div`
  width: 25%;
  min-width: 325px;
  background-color: #2b2b2b;
  padding: 1rem;
  paddig-left: 3rem;
  display:inline-block;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const RightContent = styled.div`
  width: 75%;
  background-color: #525252;

  @media (max-width: 500px) {
    display: none;
  }
`;

export default function Page() {
  const { data: session } = useSession();
  const [view, setView] = useState("home");

 
    return (
      <>
        <PageContainer >
          <LeftContent>
            <LeftPart view={view} setView={setView} />
            {view === "blank" && <CreateBlank setView={setView} />}
            {view === "quiz" && <CreateQuiz setView={setView} />}
            {view === "home" && <HomeAdmin setView={setView} />}
          </LeftContent>
          <RightContent>
          <div>vyjuj vyjujgggggggggggggggggggggggggggggggggggghggggggggggggggggg</div><div>gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg ntrcnf</div>
          <Test/>
          </RightContent>
        </PageContainer>
        
      </>
    );
  }
