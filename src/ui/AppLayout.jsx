import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import styled from 'styled-components'

const StyledAppLayout = styled.div`
display:grid;
grid-template-columns: 26rem 1fr;
grid-template-rows: auto 1fr;
height: 100dvh;
`

const Main = styled.main`
    
    background-color:var(--color-grey-50);
    overflow-y: auto;
    padding:4rem 4.8rem 6.8rem;
    `

const Container = styled.div`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 0 2.4rem;
    `
const AppLayout = () => {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container><Outlet /></Container>
            </Main>
        </StyledAppLayout>
    )
}

export default AppLayout