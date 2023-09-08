import { ChangeEvent, useState } from 'react';

const OpenBlank = () => {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, index) => (
        <div key={index}>
          <label>
            Вопрос #{index + 1}
            <input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(index, event)}
            />
          </label>
          <label>
            Ответ на вопрос #{index + 1}
            <input
              type="text"
              value={question.answer}
              onChange={(event) => handleAnswerChange(index, event)}
            />
          </label>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Добавить вопрос
      </button>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default OpenBlank;