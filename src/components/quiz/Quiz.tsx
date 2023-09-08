import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { useSession } from 'next-auth/react';

const Quiz = () => {
  const { data: session } = useSession();
  const [formState, setFormState] = useState({
    title: '',
    email: session?.user.email || '',
    questions: [{ question: '', answers: [{ answer: '', is_correct: false }] }],
  });

  const addQuestion = () => {
    setFormState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, { question: '', answers: [{ answer: '', is_correct: false }] }],
    }));
  };

  const addAnswer = (questionIndex: number) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.push({ answer: '', is_correct: false });
      return {
        ...prevState,
        questions: updatedQuestions,
      };
    });
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

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    setFormState((prevState) => {
      const updatedQuestions = [...prevState.questions];
      updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
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

  const handleAnswerChange = (questionIndex: number, answerIndex: number, event: ChangeEvent<HTMLInputElement>) => {
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

  const handleCorrectChange = (questionIndex: number, answerIndex: number) => {
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

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await fetch('https://kruase.serveo.net/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      if (response.ok) {
        console.log(response);
      } else {
        console.log('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>Привет, {session?.user.username || session?.user.name}</div>
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
          {question.answers.map((answer, answerIndex) => (
            <div key={answerIndex}>
              <label>
                Ответ на вопрос #{questionIndex + 1}, вариант #{answerIndex + 1}
                <Input
                  type="text"
                  value={answer.answer}
                  onChange={(event) => handleAnswerChange(questionIndex, answerIndex, event)}
                />
              </label>
              <label>
                Правильный ответ
                <input
                  type="checkbox"
                  checked={answer.is_correct}
                  onChange={() => handleCorrectChange(questionIndex, answerIndex)}
                />
              </label>
              {answerIndex === question.answers.length - 1 && (
                <button type="button" onClick={() => removeAnswer(questionIndex, answerIndex)}>
                  Удалить ответ
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addAnswer(questionIndex)}>
            Добавить ответ
          </button>
          {questionIndex === formState.questions.length - 1 && (
            <button type="button" onClick={() => removeQuestion(questionIndex)}>
              Удалить вопрос
            </button>
          )}
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