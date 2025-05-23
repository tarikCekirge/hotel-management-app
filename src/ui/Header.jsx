import styled from "styled-components"

const StyledHeader = styled.header`
    background-color:var(--color-grey-0);
padding: 2.4rem 4.8rem;
border-bottom:1px solid var(--color-grey-100);
`
const Header = () => {
    return (
        <StyledHeader>Header</StyledHeader>
    )
}

export default Header