import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ServiceForm = ({ onSubmit, initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [price, setPrice] = useState(initialData.price || '');
    const [userId, setUserId] = useState(initialData.userId || '');
    const [professionalId, setProfessionalId] = useState(initialData.professionalId || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, price: parseFloat(price), userId, professionalId });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Professional ID"
                value={professionalId}
                onChange={(e) => setProfessionalId(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Submit
            </Button>
        </Box>
    );
};

export default ServiceForm;
