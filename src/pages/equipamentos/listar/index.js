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

export default function ListarEquipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api
            .get("equipamento")
            .then((response) => {
                setEquipamentos(response.data);
                setLoading(false); // Indica que os dados foram carregados
                console.log("Dados coletados", response.data);
            })
            .catch((err) => {
                setLoading(false); // Indica que ocorreu um erro ao carregar os dados
                console.error("ops! ocorreu um erro", err);
            });
    }, []);

    if (loading) {
        return <loading />
    }

    if (equipamentos.length === 0) {
        return null;
    }

    return (

        <Tabela dados={equipamentos} titulo="Cadastro de Equipamentos" />

    );
}
