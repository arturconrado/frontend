import api from '../utils/axiosConfig';

export const createSchedule = async (data) => {
    try {
        const response = await api.post('/schedules', data);
        return response.data;
    } catch (error) {
        console.error('Error creating schedule', error);
        throw error;
    }
};

export const getSchedules = async () => {
    try {
        const response = await api.get('/schedules');
        return response.data;
    } catch (error) {
        console.error('Error fetching schedules', error);
        throw error;
    }
};

export const updateSchedule = async (id, data) => {
    try {
        const response = await api.patch(`/schedules/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating schedule', error);
        throw error;
    }
};

export const deleteSchedule = async (id) => {
    try {
        const response = await api.delete(`/schedules/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting schedule', error);
        throw error;
    }
};

export const assignProfessional = async (scheduleId, professionalId) => {
    try {
        const response = await api.patch(`/schedules/${scheduleId}/assign`, { professionalId });
        return response.data;
    } catch (error) {
        console.error('Error assigning professional', error);
        throw error;
    }
};
