import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

// Styled Components
const MenuWrapper = styled.div`

  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  margin-left: auto;
  margin-right: 0;
  display: flex;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 1000;

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;


// Context
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      <MenuWrapper>{children}</MenuWrapper>
    </MenusContext.Provider>
  );
}

// Toggle button component
function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    e.stopPropagation(); // Event bubbling'i durdur
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.right + 8,
      y: rect.bottom + 8,
    });

    openId === id ? close() : open(id);
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

// List dropdown
function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);
  const listRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [close]);

  if (openId !== id || !position) return null;
  return createPortal(
    <StyledList ref={listRef} position={position}>
      {children}
    </StyledList>,
    document.body
  );
}


// Button inside dropdown
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  return (
    <li>
      <StyledButton
        onClick={() => {
          onClick?.();
          close();
        }}
      >
        {icon && cloneElement(icon)}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// Export as compound component
Menus.Menu = MenuWrapper;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
