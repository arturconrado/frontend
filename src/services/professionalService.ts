import api from '../utils/axiosConfig';

export const createProfessional = async (data) => {
    try {
        const response = await api.post('/professionals', data);
        return response.data;
    } catch (error) {
        console.error('Error creating professional', error);
        throw error;
    }
};

export const getProfessionals = async () => {
    try {
        const response = await api.get('/professionals');
        return response.data;
    } catch (error) {
        console.error('Error fetching professionals', error);
        throw error;
    }
};

export const updateProfessional = async (id, data) => {
    try {
        const response = await api.patch(`/professionals/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating professional', error);
        throw error;
    }
};

export const deleteProfessional = async (id) => {
    try {
        const response = await api.delete(`/professionals/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting professional', error);
        throw error;
    }
};

export const loginProfessional = async (data) => {
    try {
        const response = await api.post('/professionals/login', data);
        return response.data;
    } catch (error) {
        console.error('Error logging in professional', error);
        throw error;
    }
};
