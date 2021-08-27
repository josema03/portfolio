import React from "react";
import styled from "styled-components";

const StyledVerticalLine = styled.div`
  content: "";
  min-height: 30vh;
  width: 2px;
  margin: 2px auto;
  background-color: ${({ theme }) => theme.colors.textSecondary.main};
`;

const VerticalLine = () => {
  return <StyledVerticalLine />;
};

export default VerticalLine;
