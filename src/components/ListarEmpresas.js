import { useEffect, useState } from "react";
import api from "../services/api";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Tabela from "./Tabela";


export default function ListarEmpresasComponent() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate('/empresas/cadastrar/' + id);
    };

    const handleAdd = () => {
        navigate('/empresas/cadastrar');
    };

    const handleDelete = (ids) => {
        // Lógica para lidar com a remoção

        ids.forEach(id => {
            let nomeEmpresa;
            empresas.forEach(empresa => {
                if (empresa.id === id) {
                    nomeEmpresa = empresa.nome;
                }
            })

            const msg = "Deseja Realmente Deletar a empresa " + nomeEmpresa;
            if (window.confirm(msg)) {
                api.delete("/filial/" + id).then((response) => alert(response.data));
            }
        });

        return < Navigate to="/empresa" />
    }

    useEffect(() => {
        api
            .get("empresa")
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
            <Loading />
        );
    }

    if (empresas.length === 0) {
        return null;
    }

    return (
       <Tabela dados={empresas} titulo={'Cadastro de Empresas'} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete}/>
    )
}