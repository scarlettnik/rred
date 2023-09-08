
const LeftPart = ({view, setView}) => {
  return (
      <div className="pink">
          <button
              active={view === "blank"}
              onClick={() => setView("blank")}
          >Создать анкету</button>
          <button 
              active={view === "quiz"}
              onClick={() => setView("quiz")}
          > Создать квиз</button>
          
      </div>
  );
};

export default LeftPart;