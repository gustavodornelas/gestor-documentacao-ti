import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const loadingStorageData = async () => {
            const storageUsuario = localStorage.getItem("@Auth:user");
            const storageToken = localStorage.getItem("@Auth:token");

            if (storageUsuario && storageToken) {
                setUsuario(storageUsuario);

                api.defaults.headers.common[
                    "Authorization"
                ] = storageToken;
            }
        };

        loadingStorageData();
    }, []);

    const signIn = async ({ usuario, senha } ) => {
        const response = await api.post("/autenticacao/login", {
            usuario,
            senha,
        });

        if (response.data.error) {
            alert (response.data.error)
        } else {
            setUsuario(response.data);

            localStorage.setItem("@Auth:token", response.data.token);
            localStorage.setItem("@Auth:user", JSON.stringify( response.data.usuario ) );
        }
    };

    const signOut = () => {
        localStorage.clear();
        setUsuario(null);

        return < Navigate to='/' />
    }


    return (
        <AuthContext.Provider value ={{
            usuario,
            signIn,
            signOut,
            signed: !!usuario
        }}>
            {children}
        </AuthContext.Provider>
    )
}