import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import styled, {css} from 'styled-components'


const LeftPart = ({view, setView}) => {
  const Button = styled.button`
  display: inline-block;
  
  align-items: center;
  color: #9e9e9e;
  cursor: pointer;
  text-decoration: none;
  font-size: 2.5vh;
  padding: 0.5vh;
  &:hover {
    color: #ccff00;
  }

  ${({ active }) =>
    active &&
    css`
      color: #ccff00;
    `}
  }
`;
  return (
      <div style={{justifyContent:"space-between"}}>
        <Button 
              active={view === "home"}
              onClick={() => setView("home")}
          > <div style={{display:"inline-flex", fontSize:"2vh"}}><PlusIcon style={{marginTop:"0.2.5vh"}}/> Данные</div></Button>
          <Button
              active={view === "blank"}
              onClick={() => setView("blank")}
          > 
        
        <div style={{display:"inline-flex", fontSize:"2vh"}}><PlusIcon style={{marginTop:"0.2.5vh"}}/> Анкета</div>
            </Button>
          <Button 
              active={view === "quiz"}
              onClick={() => setView("quiz")}
          ><div style={{display:"inline-flex", fontSize:"2vh"}}><PlusIcon style={{marginTop:"0.2.5vh"}}/> Квиз</div></Button>
          
      </div>
  );
};

export default LeftPart;