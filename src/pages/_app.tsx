import React from 'react';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import {AuthProvider} from "../AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
            <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
    );
}

export default MyApp;
