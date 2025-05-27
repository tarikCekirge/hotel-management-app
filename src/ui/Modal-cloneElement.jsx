// components/Modal.jsx
import { cloneElement, createContext, isValidElement, useCallback, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

// Styled Components
const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  z-index: 1001;
  min-width: 40rem;
  max-height: 90vh;
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

// Context
const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const open = useCallback((name) => setOpenName(name), []);
  const close = useCallback(() => setOpenName(""), []);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

// Modal.Open component
Modal.Open = function ModalOpen({ opens: opensWindowName, children }) {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("<Modal.Open> must be used within a <Modal> component.");
  }

  const { open } = modalContext;

  if (!isValidElement(children)) {
    console.error("<Modal.Open> expects a single valid React element as its child.");
    return null;
  }

  return cloneElement(children, {
    onClick: (e) => {
      children.props?.onClick?.(e);
      open(opensWindowName);
    },
  });
};

// Modal.Window component
Modal.Window = function ModalWindow({ name, children }) {
  const { openName, close } = useContext(ModalContext);

  if (openName !== name) return null;

  return createPortal(
    <>
      <Overlay onClick={close} />
      <StyledModal>
        <CloseButton onClick={close}>
          <HiXMark />
        </CloseButton>
        {cloneElement(children, {
          onCloseModal: close,
        })}
      </StyledModal>
    </>,
    document.body
  );
};
