import React from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

interface Service {
    id: string;
    title: string;
    description: string;
}

interface ServiceListProps {
    services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Available Services
            </Typography>
            <List>
                {services.map(service => (
                    <ListItem key={service.id} sx={{ borderBottom: '1px solid #ddd' }}>
                        <ListItemText
                            primary={service.title}
                            secondary={service.description}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ServiceList;
