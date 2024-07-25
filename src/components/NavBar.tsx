import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {useAuth} from "../AuthContext";

const NavBar: React.FC = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Bicos
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link href="/" passHref>
                        <Button color="inherit">Home</Button>
                    </Link>
                    {user && (
                        <>
                            <Link href="/profile" passHref>
                                <Button color="inherit">Perfil</Button>
                            </Link>

                            <Link href="/chat" passHref>
                                <Button color="inherit">Chat</Button>
                            </Link>

                            <Link href="/dashboard" passHref>
                                <Button color="inherit">Dashboard</Button>
                            </Link>

                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                    {!user && (
                        <Link href="/login" passHref>
                            <Button color="inherit">Login</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;