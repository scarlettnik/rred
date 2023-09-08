import { ChangeEvent, useState } from 'react';

const Quiz = () => {
  const [questions, setQuestions] = useState([{ question: '', answers: [{ answer: '', correct: false }] }]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [{ answer: '', correct: false }] }]);
  };

  const addAnswer = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answers.push({ answer: '', correct: false });
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number, event: ChangeEvent<HTMLInputElement>) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].answer = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectChange = (questionIndex: number, answerIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.forEach((answer, index) => {
      answer.correct = index === answerIndex;
    });
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log(questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex}>
          <label>
            Вопрос #{questionIndex + 1}
            <input
              type="text"
              value={question.question}
              onChange={(event) => handleQuestionChange(questionIndex, event)}
            />
          </label>
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>
                Ответ на вопрос #{questionIndex + 1}, вариант #{answerIndex + 1}
                <input
                  type="text"
                  value={answer.answer}
                  onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                />
              </label>
              <label>
                <input
                  type="radio"
                  checked={answer.correct}
                  onChange={() => handleCorrectChange(questionIndex, answerIndex)}
                />
                Верный
              </label>
            </div>
          ))}
          <button type="button" onClick={() => addAnswer(questionIndex)}>
            Добавить вариант ответа
          </button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>
        Добавить вопрос
      </button>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default Quiz;