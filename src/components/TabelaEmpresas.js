import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Tabela from "./Tabela";


export default function TabelaEmpresas() {
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        console.log(id);
        navigate('/cadastrar-empresa');
    };

    const handleAdd = () => {
        navigate('/cadastrar-empresa');
        console.log("Add item");
    };

    const handleDelete = (id) => {
        // Lógica para lidar com a remoção
        console.log("Deletar item: " + id);
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