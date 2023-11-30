import React from "react";
import MenuLateral from "../../components/MenuLateral";
import styled from "styled-components";
import Header from "../../components/Header";
import { Box } from "@mui/material";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  padding: 1rem;
  display: flex;
`;

const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function Empresa() {

    return (
        <Body>
            <Header />
            <Main>
                <MenuLateral />
                <Box
                    sx={{
                        p: 2,
                        marginLeft: 1,
                        border: "1px solid grey",
                        borderRadius: 2,
                        width: 2000,
                    }}
                >
                </Box>
            </Main>
        </Body>
    );
}
