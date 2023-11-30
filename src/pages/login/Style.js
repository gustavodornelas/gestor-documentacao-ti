import { Button, TextField, Typography } from "@mui/material";

import  styled  from "styled-components";
import backgroundImage from "../../assets/ti-corporativa.jpg"; // Substitua com o caminho correto para sua imagem



export const StyledContainer = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url(${backgroundImage});
  background-size: cover; // Ajuste conforme necessário
  background-position: center; // Ajuste conforme necessário
`;

export const StyledFormContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: auto;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  width: 400px;
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