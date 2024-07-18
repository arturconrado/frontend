import api from '../utils/axiosConfig';

export const createUser = async (data) => {
    try {
        const response = await api.post('/users', data);
        return response.data;
    } catch (error) {
        console.error('Error creating user', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};

export const updateUser = async (id, data) => {
    try {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user', error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user', error);
        throw error;
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post('/users/login', data);
        return response.data;
    } catch (error) {
        console.error('Error logging in user', error);
        throw error;
    }
};
