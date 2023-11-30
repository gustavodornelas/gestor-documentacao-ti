import { Button, Container, TextField, Typography } from "@mui/material";

import  styled  from "styled-components";

export const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1000vh;
  width: 100vw;
`;

export const StyledFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

export const StyledTitle = styled(Typography)`
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledInput = styled(TextField)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const StyledButton = styled(Button)`
  && {
    width: 100%;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
`;