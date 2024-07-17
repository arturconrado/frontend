import React from 'react';
import { signOut } from 'firebase/auth';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import {auth} from "../../firebaseConfig";

const LogoutButton: React.FC = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
