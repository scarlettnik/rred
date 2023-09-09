import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import styled from 'styled-components';

const OpenBlank = () => {
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
    title: '',
    email: session?.user.email || '',
    questions: [{ question: '' }],
  });

  const addQuestion = () => {
    setFormState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, { question: '' }],
    }));
  };

  const removeQuestion = (questionIndex: number) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions.splice(questionIndex, 1);
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const handleQuestionChange = (questionIndex: number, event: ChangeEvent<HTMLInputElement>) => {
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
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch('https://kruase.serveo.net/form/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        console.log(response);
        // Сброс значений формы
        setFormState({
          title: '',
          email: session?.user.email || '',
          questions: [{ question: '' }],
        });
      } else {
        console.log('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
// <div>Привет, {session?.user.email || session?.user.name}</div>
  return (
    <form style={{fontSize:"1rem", color:"white"}} onSubmit={handleSubmit}>
     
      <label>
        Название анкеты
        <Input type="text" value={formState.title} onChange={handleTitleChange} />
      </label>
      {formState.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
          <div style={{display:"inline-flex", marginTop:"1rem"}}>
          <button type="button" onClick={() => removeQuestion(questionIndex)}>
           <Trash2Icon style={{color:"#ff036c"}}/>
          </button>
            Вопрос #{questionIndex + 1}</div>
            <Input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
            />
          
          </label>
          
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
       <div style={{display:"inline-flex", marginTop:"0.5rem", fontSize:"2vh", color:"#ccff00"}}>
       <PlusIcon/>Вопрос
       </div>
      </button>
      <br />
      <PressedButton type="submit">Отправить</PressedButton>
    </form>
  );
};

export default OpenBlank;