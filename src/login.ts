import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../firebaseConfig";

const login = async (email: string, password: string): Promise<void> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        localStorage.setItem('token', token);
        console.log('Login bem-sucedido, token armazenado:', token);
    } catch (error) {
        console.error('Erro no login:', error);
    }
};

export default login;
