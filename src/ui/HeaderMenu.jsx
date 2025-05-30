import styled from "styled-components"
import Logout from "../features/authentication/Logout"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"


const StyledMenu = styled.ul`
display: flex;
gap: 0.4rem;
`
const HeaderMenu = () => {
    const navigate = useNavigate()
    return (
        <StyledMenu>
            <li>
                <ButtonIcon onClick={() => navigate('/account')}>
                    <HiOutlineUser />
                </ButtonIcon>
            </li>
            <li>
                <Logout />
            </li>
            <li>
                <DarkModeToggle />
            </li>
        </StyledMenu>
    )
}

export default HeaderMenu