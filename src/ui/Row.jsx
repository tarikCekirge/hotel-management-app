import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: ${(props) =>
    props.type === "vertical" ? "column" : "row"};
  gap: ${(props) => props.gap || "1rem"};
  align-items: ${(props) => props.align || "stretch"};
  justify-content: ${(props) => props.justify || "flex-start"};
`;


Row.defaultProps = {
  type: "horizontal",
  gap: "1rem",
  align: "stretch",
  justify: "flex-start",
};

export default Row;
