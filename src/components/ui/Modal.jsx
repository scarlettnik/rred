import React, { useState } from "react";
import styled from "styled-components";
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: "#ff036c";
  padding: 10px;
  border-radius: 4px;
`;

const Modal = ({ children, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer className="modal-overlay">
      <ModalContent className="modal-content">
        <button style={{width:"7rem", color:"#ff036c", marginRight:"0"}} className="modal-close" onClick={handleClose}>
          &times;
        </button>
        {children}
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;