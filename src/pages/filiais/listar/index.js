import MenuLateral from "../../../components/MenuLateral";
import { Body, Main} from "../../empresas/listar/Style";
import Header from "../../../components/Header";
import { Paper } from "@mui/material";
import ListarFiliaisComponent from "../../../components/ListarFiliais";

export default function ListarFiliais() {
    
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
                    <ListarFiliaisComponent />
                </Paper>
            </Main>
        </Body>
    );
}
