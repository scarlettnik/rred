import { useState } from "react";
import styled from "styled-components";

const HomeAdmin = () => {
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);

  const PressedButton = styled.button`
    color: black;
    position: relative;
    width: 100%;
    display: block;
    text-align: center;
    align-items: center;
    text-decoration: none;
    margin-top: 20px;
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

    &:hover {
      box-shadow: 0 0 0 0 rgba(0, 0, 120, 0);
      background-position: 0 0;
    }
  `;
  const handleFileChange1 = (event) => {
    const file = event.target.files[0];
    setSelectedFile1(file);
  };

  const handleFileChange2 = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);
  };

  const handleFileChange3 = (event) => {
    const file = event.target.files[0];
    setSelectedFile3(file);
  };

  const handleFileUpload1 = async () => {
    if (!selectedFile1) return;

    const formData = new FormData();
    formData.append("file", selectedFile1);

    try {
      const response = await fetch("https://kruase.serveo.net/api/extend/txt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resultFile = await response.blob();
        const downloadUrl = URL.createObjectURL(resultFile);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "result.txt";
        link.click();

        setSelectedFile1(null); // Очистить выбранный файл
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload2 = async () => {
    if (!selectedFile2) return;

    const formData = new FormData();
    formData.append("file", selectedFile2);

    try {
      const response = await fetch(
        "https://kruase.serveo.net/api/extend/json",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const resultFile = await response.json();

        // Создание объекта Blob из JSON-строки
        const blob = new Blob([JSON.stringify(resultFile)], {
          type: "application/json",
        });

        // Создание URL для скачивания файла
        const downloadUrl = URL.createObjectURL(blob);

        // Создание ссылки для скачивания файла
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "result.json";
        link.click();

        setSelectedFile2(null); // Очистить выбранный файл
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleFileUpload3 = async () => {
    if (!selectedFile3) return;

    const formData = new FormData();
    formData.append("file", selectedFile3);

    try {
      const response = await fetch("https://kruase.serveo.net/api/main", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resultFile = await response.json();
        const blob = new Blob([JSON.stringify(resultFile)], {
          type: "application/json",
        });

        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "result.json";
        link.click();

        setSelectedFile3(null); 
      } else {
        console.log("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div
        style={{
          transform: "scaleX(-1) ",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="410.000000pt"
          height="200.000000pt"
          viewBox="0 0 416.000000 354.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,354.000000) scale(0.100000,-0.100000)"
            fill="#ff036c"
            stroke="none"
          >
            <path
              d="M1177 3429 c-9 -5 -24 -23 -32 -39 -22 -43 -96 -90 -142 -91 -21 0
-47 -4 -58 -9 -15 -6 -8 -9 28 -9 39 -1 48 -4 45 -17 -4 -21 -20 -30 -78 -43
l-45 -10 48 2 c59 3 65 -21 11 -47 -20 -9 -34 -20 -30 -23 3 -3 12 0 20 6 22
19 36 4 36 -37 0 -60 25 -149 80 -286 57 -143 68 -202 51 -273 -26 -109 -33
-116 -173 -194 -71 -39 -136 -72 -145 -73 -13 -1 -43 52 -115 196 -80 160
-108 208 -151 251 -67 68 -115 91 -192 90 -109 -1 -185 -58 -185 -138 0 -47
15 -64 99 -114 73 -44 136 -198 181 -444 24 -131 42 -177 84 -218 40 -39 184
-110 312 -152 l99 -34 21 -139 c36 -234 87 -393 169 -526 19 -31 35 -69 35
-86 0 -31 -38 -224 -66 -335 -14 -57 -23 -73 -55 -99 -51 -41 -79 -100 -79
-166 0 -74 17 -88 116 -96 89 -8 197 4 241 27 23 12 48 52 114 176 46 89 90
161 97 161 15 0 109 -51 182 -101 99 -66 113 -99 41 -99 -78 0 -201 -89 -201
-145 0 -61 69 -70 435 -57 206 7 266 12 290 24 35 19 310 272 319 293 3 8 24
24 48 36 100 50 178 140 278 319 111 199 147 255 208 320 104 114 282 213 428
239 34 6 126 11 205 10 186 -3 239 17 239 88 0 43 -31 75 -108 111 -54 26 -65
27 -212 27 -133 0 -166 -4 -235 -24 -166 -48 -330 -144 -425 -248 -27 -29 -91
-120 -142 -201 -91 -143 -201 -292 -218 -292 -4 0 -15 23 -25 52 -46 143 -180
352 -378 592 -185 224 -314 415 -355 526 -53 145 -38 233 81 480 46 96 88 186
92 200 4 14 27 64 51 111 41 83 104 251 118 316 6 27 3 37 -18 58 -29 29 -78
32 -212 13 l-82 -12 -42 38 c-24 21 -77 55 -119 75 -69 33 -84 36 -161 36 -76
0 -93 -4 -157 -34 -86 -40 -117 -38 -174 14 -40 36 -61 42 -92 24z"
            />
          </g>
        </svg>
      </div>
      <div style={{ color: "#ff036c", fontSize: "2vh" }}>
        Здесь вы можете провести собственный опрос, дополнить ответы
        проведенного опроса (принимается .json файл, вернется .txt или .json в
        зависимости от вашей задачи), получить анализ уже проведенного опроса
      </div>
      <PressedButton style={{ marginTop: "4rem" }}>
        <label htmlFor="file1" style={{ padding: "1rem" }}>
          {selectedFile1 ? selectedFile1.name : "Дополнить .txt"}
        </label>
        <input
          id="file1"
          type="file"
          onChange={handleFileChange1}
          style={{ display: "none" }}
        />
        {selectedFile1 && (
          <button onClick={handleFileUpload1}>Отправить</button>
        )}
      </PressedButton>
      <PressedButton style={{ marginTop: "2rem" }}>
        <label htmlFor="file2" style={{ padding: "1rem" }}>
          {selectedFile2 ? selectedFile2.name : "Дополнить .json"}
        </label>
        <input
          id="file2"
          type="file"
          onChange={handleFileChange2}
          style={{ display: "none" }}
        />
        {selectedFile2 && (
          <button onClick={handleFileUpload2}>Отправить</button>
        )}
      </PressedButton>
      <PressedButton style={{ marginTop: "2rem" }}>
        <label htmlFor="file3" style={{ padding: "1rem" }}>
          {selectedFile3 ? selectedFile3.name : "Отправить данные для анализа"}
        </label>
        <input
          id="file3"
          type="file"
          onChange={handleFileChange3}
          style={{ display: "none" }}
        />
        {selectedFile3 && (
          <button onClick={handleFileUpload3}>Отправить</button>
        )}
      </PressedButton>
    </>
  );
};

export default HomeAdmin;
