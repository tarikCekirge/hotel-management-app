import styled from "styled-components";

const fontSizeByTag = {
  h1: "2.5rem",
  h2: "2rem",
  h3: "1.75rem",
  h4: "1.5rem",
  h5: "1.25rem",
  h6: "1rem",
};

const StyledHeading = styled.div`
  font-size: ${(props) => fontSizeByTag[props.$as] || "1rem"};
  font-weight: 600;
  text-align: ${(props) => props.$align || "left"};
  margin: 0;
  padding: 0;
`;

export default function Heading({ as = "h1", text, children, textAlign = "left", ...props }) {
  return (
    <StyledHeading as={as} $as={as} $align={textAlign} {...props}>
      {text || children}
    </StyledHeading>
  );
}
