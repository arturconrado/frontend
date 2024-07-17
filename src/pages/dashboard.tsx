import type { NextPage } from 'next';
import ProtectedRoute from '../components/ProtectedRoute';
import {useAuth} from "../AuthContext";
import React from "react";

const Dashboard: NextPage = () => {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p>Bem-vindo, {user?.email}</p>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;
