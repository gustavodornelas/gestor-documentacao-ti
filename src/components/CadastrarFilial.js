import React, { useEffect, useState } from "react";
import api from "../services/api";
import Loading from "./Loading";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Footer = styled.div`
    display: flex;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    justify-content: center;
`;

export default function CadastrarFilialComponent() {
    const [filial, setFilial] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nome_filial: "",
        id_empresa: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        telefone: ""
    });
    const [editingId, setEditingId] = useState(null);
    const [empresas, setEmpresas] = useState([]);
    const { id } = useParams(); // Recupera o id da URL
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar a lista de empresas na rota 'empresa' da API
        api.get("/empresa").then((response) => setEmpresas(response.data));
    }, []);

    useEffect(() => {

        if (id) {
            api
                .get("filial/" + id)
                .then((response) => {
                    setFilial(response.data);
                    setEditingId(id);
                    
                })
                .catch((err) => {
                    setLoading(false); // Indica que ocorreu um erro ao carregar os dados
                    console.error("Ops! Ocorreu um erro", err);
                });
        } else {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (editingId) {
            console.log(filial);
            setFormData({
                nome_filial: filial.nome,
                id_empresa: filial.id_empresa,
                endereco: filial.endereco,
                bairro: filial.bairro,
                cidade: filial.cidade,
                estado: filial.estado,
                telefone: filial.telefone
            });
            setLoading(false);
        }
    }, [editingId, filial]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('clicado');

        // Verificar se está em modo de edição ou cadastro
        if (editingId !== null) {
            // Modo de edição
            try {
                await api.put("/filial/" + id, formData);
                // Atualizar a lista de filiais após a edição
                alert("Filial " + formData.nome_filial + " alterada!");
                navigate("/filiais");
            } catch (error) {
                alert("Erro ao alterar filial:", error);
            }
        } else {
            // Modo de cadastro
            try {
                await api.post("/filial", formData);
                // Atualizar a lista de filiais após o cadastro
                alert("Filial " + formData.nome_filial + " cadastrada!");
                navigate("/filiais");
            } catch (error) {
                alert("Erro ao cadastrar filial:", error);
            }
        }
    };

    const handleDelete = () => {
        const msg = "Deseja realmente deletar a filial " + filial.nome_filial;
        if (window.confirm(msg)) {
            api.delete("/filial/" + editingId).then((response) => alert(response.data));
            navigate("/filiais");
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel id="empresa-select-label">Empresa</InputLabel>
                <Select
                    labelId="empresa-select-label"
                    name="id_empresa"
                    value={formData.id_empresa}
                    label="Empresa"
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                >
                    {empresas.map((empresa) => (
                        <MenuItem key={empresa.id} value={empresa.id}>
                            {empresa.nome}
                        </MenuItem>
                    ))}
                </Select>

                <TextField
                    label="Nome da Filial"
                    name="nome_filial"
                    value={formData.nome_filial}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Endereço"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Bairro"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                />
                <Footer>
                    <Button type="submit" variant="contained" color="primary">
                        {editingId !== null ? "Editar Filial" : "Cadastrar Filial"}
                    </Button>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        disabled={editingId === null ? true : false}
                        onClick={handleDelete}
                    >
                        Deletar Filial
                    </Button>
                </Footer>
            </FormControl>
        </form>
    );
}
