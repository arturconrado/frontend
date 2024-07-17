import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ErrorPage = () => {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/signup');
        }, 3000); // Redireciona após 3 segundos

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Erro</h1>
            <p>Você não está autenticado. Redirecionando para a página de cadastro...</p>
        </div>
    );
};

export default ErrorPage;
