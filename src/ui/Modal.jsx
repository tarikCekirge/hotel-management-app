// components/Modal.jsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
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
const ModalContext = createContext(null);

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = useCallback((name) => setOpenName(name), []);
  const close = useCallback(() => setOpenName(""), []);

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function ModalOpen({ opens: opensWindowName, children }) {
  const context = useContext(ModalContext);
  if (!context) {
    console.warn("Modal.Open must be used inside Modal.");
    return null;
  }
  const { open } = context;
  return children({ open: () => open(opensWindowName) });
};

function ModalContent({ close, modalRef }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === "Escape") close(); };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) close();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("mousedown", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close, modalRef]);

  return null;
}

function ModalWindow({ name, children }) {
  const context = useContext(ModalContext);
  const modalRef = useRef();

  if (!context) return null;

  const { openName, close } = context;
  const isOpen = openName === name;

  if (!isOpen) return null;

  return createPortal(
    <>
      <Overlay>
        <StyledModal ref={modalRef}>
          <CloseButton onClick={close}>
            <HiXMark />
          </CloseButton>
          {typeof children === "function" ? children({ close }) : children}
        </StyledModal>
      </Overlay>
      <ModalContent close={close} modalRef={modalRef} />
    </>,
    document.body
  );
};


Modal.Open = ModalOpen;
Modal.Window = ModalWindow;

export default Modal;