import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { Trash2Icon, PlusIcon} from "lucide-react";
import styled from "styled-components";
const Quiz = () => {
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

  const { data: session } = useSession();
  const [formState, setFormState] = useState({
    title: "",
    email: session?.user.email || "",
    questions: [{ question: "", answers: [{ answer: "", is_correct: false }] }],
  });
  const [error, setError] = useState("");

  const addQuestion = () => {
    setFormState((prevState) => ({
      ...prevState,
      questions: [
        ...prevState.questions,
        { question: "", answers: [{ answer: "", is_correct: false }] },
      ],
    }));
  };

  const addAnswer = (questionIndex) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.push({
        answer: "",
        is_correct: false,
      });
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const removeQuestion = (questionIndex) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions.splice(questionIndex, 1);
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const handleQuestionChange = (questionIndex, event) => {
    const { value } = event.target;
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].question = value;
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleAnswerChange = (questionIndex, answerIndex, event) => {
    const { value } = event.target;
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers[answerIndex].answer = value;
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleCorrectChange = (questionIndex, answerIndex) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.forEach((answer, index) => {
        answer.is_correct = index === answerIndex;
      });
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasValidAnswers = formState.questions.every((question) =>
      question.answers.some((answer) => answer.is_correct)
    );

    if (!hasValidAnswers) {
      setError("Каждый вопрос должен иметь как минимум один правильный ответ.");
      return;
    }

    try {
      const response = await fetch("https://kruase.serveo.net/quiz/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        console.log(response);
        setFormState({
          title: "",
    email: session?.user.email || "",
    questions: [{ question: "", answers: [{ answer: "", is_correct: false }] }],
        });
      } else {
        console.log("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
//     <div>Привет, {session?.user.username || session?.user.name}</div>
  return (
    <form style={
      {color:"white", fontSize:"1rem"}
    } onSubmit={handleSubmit}>
 
      <label>
        Название анкеты
        <Input
          type="text"
          value={formState.title}
          onChange={handleTitleChange}
        />
      </label>
      {formState.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label >
         <div style={{display:"inline-flex", marginTop:"1rem"}}> <Trash2Icon  style={{  color:"#ff036c"}}/> Вопрос #{questionIndex + 1} <button
                type="button"
               
                onClick={() => removeQuestion(questionIndex)}
              >
                
              </button></div>
            <Input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
            />
            <div
              style={{
                display: "inline-flex",
                justifyContent: "flex-end",
               
              }}
            >
              
            </div>
            {question.answers.map((answer, answerIndex) => (
              <div
                style={{
                  width: "90%",
                  marginLeft: "10%",
                  justifyContent: "flex-end",
                  marginTop:"-0.5rem"
                }}
                key={answerIndex}
              >
                <label style={{ marginTop:"1rem"}}>
                  
                  {answerIndex + 1} вариант ответа
                  <Input
                    type="text"
                    value={answer.answer}
                    onChange={(event) =>
                      handleAnswerChange(questionIndex, answerIndex, event)
                    }
                  />
                </label>
                <label
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ marginBottom:"1rem"}}>
                    Правильный ответ
                    <input
                    style={{marginLeft:"0.2rem"}}
                      type="checkbox"
                      checked={answer.is_correct}
                      onChange={() =>
                        handleCorrectChange(questionIndex, answerIndex)
                      }
                    />
                  </div>
                  <div>
                    <button
                      style={{ marginRight: "0px",  }}
                      type="button"
                      onClick={() => removeAnswer(questionIndex, answerIndex)}
                    >
                      <Trash2Icon
                        style={{
                          width: "1.2rem",
                          marginTop: "-2.5rem",
                          color: "#ff036c",
                        }}
                      />
                    </button>
                  </div>
                </label>
              </div>
            ))}
            <button
              style={{ marginLeft: "10%",}}
              type="button"
              onClick={() => addAnswer(questionIndex)}
            >
              <div style={{display:"inline-flex", color:"#ccff00" }}><PlusIcon/>Вариант ответа</div>
            </button>
          </label>

          <br />
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        <div style={{display:"inline-flex", color:"#ccff00" }}><PlusIcon/>Вопрос</div>
      </button>
      {error && <div>{error}</div>}
      <br />
      <PressedButton type="submit">Отправить</PressedButton>
    </form>
  );
};

export default Quiz;
