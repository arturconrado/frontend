import React, { useEffect, useState } from 'react';
import { getServices } from '../../services/api';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const ServicesList = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await getServices();
            setServices(response.data);
        };
        fetchServices();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Services
            </Typography>
            <Grid container spacing={4}>
                {services.map((service) => (
                    <Grid item key={service.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {service.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                </Typography>
                                <Typography variant="body1" color="text.primary">
                                    ${service.price.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ServicesList;
