import React, { useEffect, useState } from "react";
import api from "../../api";
import MenuLateral from "../../components/MenuLateral";
import styled from "styled-components";
import Header from "../../components/Header";
import { Box, CircularProgress, TextField, Button } from "@mui/material";

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

export default function CadastrarEmpresa(props) {
    const [empresa, setEmpresa] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ nome: "", cnpj: "" });
    const [editingId, setEditingId] = useState(null);
    
    useEffect(() => {
        // Simular o carregamento de dados da API
        if (empresa) {
            const fetchData = async () => {
                try {
                    const result = await api.get("/empresas/" + empresa);
                    setEmpresa(result.data);
                } catch (error) {
                    console.error("Error fetching data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [empresa]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se está em modo de edição ou cadastro
        if (editingId !== null) {
            // Modo de edição
            try {
                await api.put(`/empresa/${editingId}`, formData);
                // Atualizar a lista de empresas após a edição
                const updatedEmpresas = await api.get("/empresas");
                setEmpresa(updatedEmpresas.data);
                setEditingId(null);
                setFormData({ nome: "", cnpj: "" });
            } catch (error) {
                console.error("Error editing empresa:", error);
            }
        } else {
            // Modo de cadastro
            try {
                await api.post("/empresas", formData);
                // Atualizar a lista de empresas após o cadastro
                const updatedEmpresas = await api.get("/empresas");
                setEmpresa(updatedEmpresas.data);
                setFormData({ nome: "", cnpj: "" });
            } catch (error) {
                console.error("Error creating empresa:", error);
            }
        }
    };

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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nome da Empresa"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="CNPJ"
                            name="cnpj"
                            value={formData.cnpj}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            {editingId !== null ? "Editar Empresa" : "Cadastrar Empresa"}
                        </Button>
                    </form>
                </Box>
            </Main>
        </Body>
    );
}
