import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';

const OpenBlank = () => {
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

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Привет, {session?.user.email || session?.user.name}</div>
      <label>
        Название анкеты
        <Input type="text" value={formState.title} onChange={handleTitleChange} />
      </label>
      {formState.questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            Вопрос #{questionIndex + 1}
            <Input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
            />
          </label>
          <button type="button" onClick={() => removeQuestion(questionIndex)}>
            Удалить вопрос
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Добавить вопрос
      </button>
      <br />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default OpenBlank;