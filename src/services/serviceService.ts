import api from '../utils/axiosConfig';

export const createService = async (data) => {
    try {
        const response = await api.post('/services', data);
        return response.data;
    } catch (error) {
        console.error('Error creating service', error);
        throw error;
    }
};

export const getServices = async () => {
    try {
        const response = await api.get('/services');
        return response.data;
    } catch (error) {
        console.error('Error fetching services', error);
        throw error;
    }
};

export const updateService = async (id, data) => {
    try {
        const response = await api.patch(`/services/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating service', error);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        const response = await api.delete(`/services/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting service', error);
        throw error;
    }
};

export const acceptService = async (serviceId, professionalId) => {
    try {
        const response = await api.post(`/services/${serviceId}/accept`, { professionalId });
        return response.data;
    } catch (error) {
        console.error('Error accepting service', error);
        throw error;
    }
};
