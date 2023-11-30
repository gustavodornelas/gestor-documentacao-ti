import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Loading from "../../../components/Loading";
import { TextField, Button, FormControl, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Footer = styled.div`
    display: flex;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-content: center;

`

export default function CadastrarEmpresaComponent() {

    const [empresa, setEmpresa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ nome: "", cnpj: "" });
    const [editingId, setEditingId] = useState(null);
    const { id } = useParams(); // Recupera o id da URL
    const navigate = useNavigate()

    useEffect(() => {

        if (id) {
            api
                .get("empresa/" + id)
                .then((response) => {
                    setEmpresa(response.data);
                    setEditingId(id);
                })
                .catch((err) => {
                    setLoading(false); // Indica que ocorreu um erro ao carregar os dados
                    console.error("ops! ocorreu um erro", err);
                });
        } else {
            setLoading(false)
        }
    }, [id]);

    useEffect(() => {
        if (editingId) {
            setFormData({ nome: empresa.nome, cnpj: empresa.cnpj });
            setLoading(false)
        }
    }, [editingId, empresa])


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
                await api.put('/empresa/' + id, formData);
                // Atualizar a lista de empresas após a edição
                alert("Empresa " + formData.nome + " alterada!");
                navigate("/empresas");
            } catch (error) {
                alert("Erro ao alterar empresa:", error);
            }
        } else {
            // Modo de cadastro
            try {
                await api.post("/empresa", formData);
                // Atualizar a lista de empresas após o cadastro
                alert("Empresa " + formData.nome + " cadastrada!");
                navigate("/empresas");
            } catch (error) {
                alert("Erro ao cadastrar empresa:", error);
            }
        }
    };

    const handleDelete = () => {
        const msg = "Deseja Realmente Deletar a empresa " + empresa.nome;
        if (window.confirm(msg)) {
            api.delete("/empresa/" + id).then((response) => alert(response.data)).catch((AxiosError) => alert(AxiosError.response.data));
            navigate("/empresas");
        };
    }

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                marginBottom={3}
            > Cadastro de empresas
            </Typography>
            <FormControl fullWidth>
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
                <Footer>
                    <Button type="submit" variant="contained" color="primary">
                        {editingId !== null ? "Editar Empresa" : "Cadastrar Empresa"}
                    </Button>

                    <Button type="button" variant="contained" color="secondary" disabled={editingId === null ? true : false} onClick={handleDelete}>
                        Deletar Empresa
                    </Button>

                </Footer>
            </FormControl>
        </form>
    );
}
