import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const api = axios.create({
    baseURL: API_URL,
});

export const createService = async (serviceData) => {
    return api.post('/services', serviceData);
};

export const updateService = async (id, serviceData) => {
    return api.patch(`/services/${id}`, serviceData);
};

export const deleteService = async (id) => {
    return api.delete(`/services/${id}`);
};

export const getService = async (id) => {
    return api.get(`/services/${id}`);
};

export const getServices = async () => {
    return api.get('/services');
};
