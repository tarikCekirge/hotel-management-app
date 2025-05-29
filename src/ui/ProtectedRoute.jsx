import styled from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const FullPage = styled.div`
  height: 100vh;
  width: 100%;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate("/login", { replace: true });
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) return <FullPage><Spinner /></FullPage>;

    if (!isAuthenticated) return null;

    return children;
};

export default ProtectedRoute;
