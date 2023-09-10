"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LeftPart from "@/components/abminPage/LeftPart";
import CreateBlank from "@/components/abminPage/CreateBlank";
import CreateQuiz from "@/components/abminPage/CreateQuiz";
import HomeAdmin from "../../../components/abminPage/HomeAdmin";
import styled from "styled-components";
import Test from "../../../components/quiz/test";
import Modal from "../../../components/ui/Modal";
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
  display: inline-block;

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

const PressedButton = styled.button`
  color: black;
  position: relative;
  width: 30%;
  display: block;
  text-align: center;
  align-items: center;
  text-decoration: none;
  margin-left: auto;
  margin-right: auto;
  padding: 5px 20px;
  border-radius: 30px;
  background-image: linear-gradient(
    50deg,
    #4cf5f2 20%,
    #66ff00 50%,
    #4cf5f2 100%
  );
  background-position: 100% 0;
  background-size: 200% 200%;
  font-size: 2vh;
  font-weight: 300;
  outline: none;
  box-shadow: 0 12px 25px 0 rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  overflow: hidden; /* Добавлено свойство overflow */

  &:hover {
    box-shadow: 0 0 0 0 rgba(0, 0, 120, 0);
    background-position: 0 0;
  }
`;

export default function Page() {
  const [image, setImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [formData, setFormData] = useState([]);
  const { data: session } = useSession();
  const [view, setView] = useState("home");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const email = document.getElementById("div1").innerText;
        const domain = document.getElementById("div2").innerText;

        const formData = {
          email,
          domain,
        };

        const response = await fetch("https://kruase.serveo.net/form/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const jsonData = await response.json();
          setFormData(jsonData);
        } else {
          console.log("Request failed");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async (id) => {
    try {
      const response = await fetch("https://kruase.serveo.net/form/result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ form_id: id }),
      });

      if (response.ok) {
        const imageData = await response.blob();
        const imageUrl = URL.createObjectURL(imageData);
        setImage(imageUrl);
      } else {
        console.log("Request failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCloseModal = () => {
    console.log("Modal closed");
  };
  return (
    <>
      <PageContainer>
        <LeftContent>
          <LeftPart view={view} setView={setView} />
          {view === "blank" && <CreateBlank setView={setView} />}
          {view === "quiz" && <CreateQuiz setView={setView} />}
          {view === "home" && <HomeAdmin setView={setView} />}
        </LeftContent>
        <RightContent>
  <div>
    <div>
      <div
        style={{
          color: "white",
          fontSize: "2.5vh",
          padding: "1rem",
          marginLeft: "1rem",
        }}
      >
        Ваши анкеты
      </div>
      <div>
        {formData.length === 0 ? (
          <div
            style={{
              display: "grid",
              placeItems: "center",
              height: "100px",
              color: "white",
              fontSize: "4vh",
            }}
          >
            Для начала работы создайте анкету
          </div>
        ) : (
          formData.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 6fr",
                  gap: "1rem",
                  justifyContent: "space-between",
                  margin: "1rem",
                  width: "95%",
                  padding: "3vh",
                  borderRadius: "20px",
                  backgroundColor: "#303030",
                  color: "white",
                  fontSize: "2vh",
                }}
              >
                <h2>{item.title}</h2>
                <h2 style={{ marginRight: "100px" }}>{item.link}</h2>
                <PressedButton
                  style={{ marginRight: "0px" }}
                  onClick={() => handleButtonClick(item.id)}
                >
                  <p style={{ maxWidth: "100%", overflow: "hidden" }}>
                    Результаты голосования
                  </p>
                </PressedButton>
              </div>
            </div>
          ))
        )}
      </div>
      {image && (
        <Modal onClose={handleCloseModal}>
          <img src={image} />
        </Modal>
      )}
    </div>
  </div>
  <div style={{ display: "none" }} id="div1">
    {session?.user.email}
  </div>
  <div style={{ display: "none" }} id="div2">
    https://kruase.serveo.net/
  </div>
</RightContent>
      </PageContainer>
    </>
  );
}
