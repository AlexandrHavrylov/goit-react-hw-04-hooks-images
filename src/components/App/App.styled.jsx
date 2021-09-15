import styled from "@emotion/styled";
import Loader from "react-loader-spinner";

export const Container = styled.div`
  margin: 0, auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
  width: 100%;
`;

export const StyledLoader = styled(Loader)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
