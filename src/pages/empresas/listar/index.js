import { useEffect, useState } from "react";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";
import Tabela from "../../../components/Tabela";


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

    const handleDelete = async (ids) => {
        try {
            await Promise.all(ids.map(async (id) => {
                let nomeEmpresa;

                empresas.forEach(empresa => {
                    if (empresa.id === id) {
                        nomeEmpresa = empresa.nome;
                    }
                });

                const msg = "Deseja realmente deletar a empresa " + nomeEmpresa;

                if (window.confirm(msg)) {
                    await api.delete("/empresa/" + id);
                }
            }));

            // Todas as exclusões foram bem-sucedidas
            alert("Empresas deletadas com sucesso!");
            window.location.reload(false);
        } catch (error) {
            // Um erro ocorreu durante a exclusão
            alert("Erro ao excluir empresas: " + error.response.data);
        }
    };

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
        <Tabela dados={empresas} titulo={'Cadastro de Empresas'} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
    )
}