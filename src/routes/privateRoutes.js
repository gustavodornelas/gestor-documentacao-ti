import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { Navigate, Outlet } from "react-router-dom"
import MenuLateral from "../components/MenuLateral";
import { Body, Main } from "./Style";
import Header from "../components/Header";
import { Paper } from "@mui/material";

export const PrivateRoutes = () => {

    const {signed} = useContext(AuthContext);

    // return  signed ? <Outlet /> : <Navigate to="/" />

    if (signed) {
        return (
            <Body>
                <Header />
                <Main>
                    <MenuLateral />
                    <Paper
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
                        <Outlet />
                    </Paper>
                </Main>
            </Body>
        )
    } else {
        return <Navigate to="/" />
    } 
}