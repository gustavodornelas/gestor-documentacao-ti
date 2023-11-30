import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import MenuLateral from "../../../components/MenuLateral";
import styled from "styled-components";
import Header from "../../../components/Header";
import { Box, CircularProgress } from "@mui/material";
import Tabela from "../../../components/Tabela";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  padding: 1rem;
  display: flex;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function ListarColaboradores() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("colaborador")
            .then((response) => {
                setEmpresas(response.data);
                setLoading(false); // Indica que os dados foram carregados
                console.log("Dados coletados", response.data);
            })
            .catch((err) => {
                setLoading(false); // Indica que ocorreu um erro ao carregar os dados
                console.error("ops! ocorreu um erro", err);
            });
    }, []);
    
    if (loading) {
        return (
            <Body>
                <Header />
                <Main>
                    <MenuLateral />
                    <Box
                        sx={{
                            p: 2,
                            marginLeft: 1,
                            border: "1px solid grey",
                            borderRadius: 2,
                            width: 2000,
                            overflowY: "auto",
                            overflowX: "auto",
                        }}
                    >
                        <LoadingMessage>
                            <CircularProgress />
                            <p>Carregando...</p>
                        </LoadingMessage>
                    </Box>
                </Main>
            </Body>
        );
    }

    if (empresas.length === 0) {
        return null;
    }

    return (
        <Body>
            <Header />
            <Main>
                <MenuLateral />
                <Box
                    sx={{
                        p: 2,
                        marginLeft: 1,
                        border: "1px solid grey",
                        borderRadius: 2,
                        width: 2000,
                    }}
                >
                    <Tabela dados={empresas} titulo="Cadastro de Colaboradores" />
                </Box>
            </Main>
        </Body>
    );
}