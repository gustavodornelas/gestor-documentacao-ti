import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Tabela from "../../../components/Tabela";

export default function ListarFiliaisComponent() {
    const [filiais, setFiliais] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate('/filiais/cadastrar/' + id);
    };

    const handleAdd = () => {
        navigate('/filiais/cadastrar');
    };

    const handleDelete = (ids) => {
        ids.forEach(id => {
            let nomeFilial;
            
            filiais.forEach(filial => {
                if (filial.id === id) {
                    nomeFilial = filial.nome;
                }
            });

            const msg = "Deseja Realmente Deletar a filial " + nomeFilial;

            if (window.confirm( msg )) {
                api.delete('/filial/' + id).then((response) => alert(response.data)).catch((AxiosError) => alert(AxiosError.response.data));

            }
        });


        window.location.reload(false);
    };

    useEffect(() => {
        api
            .get("filial")
            .then((response) => {
                setFiliais(response.data);
                setLoading(false); // Indica que os dados foram carregados
                console.log("Dados coletados", response.data);
            })
            .catch((err) => {
                setLoading(false); // Indica que ocorreu um erro ao carregar os dados
                console.error("Ops! Ocorreu um erro", err);
            });
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (filiais.length === 0) {
        return null;
    }

    return (
        <Tabela dados={filiais} titulo={'Cadastro de Filiais'} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    );
}