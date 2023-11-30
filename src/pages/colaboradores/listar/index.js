import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Tabela from "../../../components/Tabela";
import Loading from "../../../components/Loading";

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
        <Loading />
    }

    if (empresas.length === 0) {
        return null;
    }

    return (
        <Tabela dados={empresas} titulo="Cadastro de Colaboradores" />
    );
}
