import styled from "styled-components";



const fontSizeByTag = {
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
    h4: "1.5rem",
    h5: "1.25rem",
    h6: "1rem",
};

const Heading = styled.h1`
  font-size: ${(props) => fontSizeByTag[props.as || "h1"] || "1rem"};
  font-weight: 600;
  color: #333;
  margin: 0;
  padding: 0;

`;

export default Heading;
