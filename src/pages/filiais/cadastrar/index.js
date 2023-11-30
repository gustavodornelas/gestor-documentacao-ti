import MenuLateral from "../../../components/MenuLateral";
import { Body, Main } from "./Style";
import Header from "../../../components/Header";
import { Paper } from "@mui/material";
import CadastrarFilialComponent from "../../../components/CadastrarFilial";

export default function CadastrarFilial() {

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
                    <CadastrarFilialComponent />
                </Paper>
            </Main>
        </Body>
    );
}
