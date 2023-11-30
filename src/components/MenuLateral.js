import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import { AccountCircle } from '@mui/icons-material';
import styled from 'styled-components';
import { AuthContext } from '../context/auth';
import { useContext } from 'react';

const Footer = styled.div`
    height: 73%;
    display: flex;
    align-items: end;

`

export default function MenuLateral() {
    const location = useLocation();
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const { signOut } = useContext(AuthContext);


    React.useEffect(() => {
        // Encontre o índice do item no menu com base na rota atual
        const foundIndex = menuItems.findIndex(item => item.to === location.pathname);

        // Se o índice for encontrado, defina-o como o índice selecionado
        if (foundIndex !== -1) {
            setSelectedIndex(foundIndex);
        }
    }, [location]);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, to: '/' },
        { text: 'Colaboradores', icon: <PersonIcon />, to: '/colaboradores' },
        { text: 'Empresas', icon: <CorporateFareIcon />, to: '/empresas' },
        { text: 'Equipamentos', icon: <ComputerIcon />, to: '/equipamentos' },
        { text: 'Filiais', icon: <BusinessIcon />, to: '/filiais' },
    ];

    const handleLogout = () => {
        signOut();
    }

    return (
        <Box sx={{ height: '89vh', width: '80%', maxWidth: 240, bgcolor: 'primary.secondary', borderRadius: 2 }}>
            <List component="nav" aria-label="main mailbox folders">
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        selected={selectedIndex === index}
                        onClick={(event) => handleListItemClick(event, index)}
                        component={Link}
                        to={item.to}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
            <Divider />

            <Footer>
                <>
                    <ListItemButton
                        onClick={handleLogout}
                    >
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary='Logout' />
                    </ListItemButton>
                </>
            </Footer>

        </Box>
    );
}
