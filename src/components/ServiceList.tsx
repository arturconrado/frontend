import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Paper, IconButton, Grid } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { doc, deleteDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import {db} from "../../firebaseConfig";

interface Service {
    id: string;
    title: string;
    description: string;
}

interface ServiceListProps {
    services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await deleteDoc(doc(db, 'services', id));
                toast.success('Serviço excluído com sucesso!');
                router.reload();
            } catch (error) {
                console.error('Erro ao excluir serviço: ', error);
                toast.error('Erro ao excluir serviço');
            }
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/services/${id}`);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Serviços Disponíveis
            </Typography>
            <List>
                {services.map(service => (
                    <Paper key={service.id} sx={{ mb: 2, p: 2 }}>
                        <ListItem
                            secondaryAction={
                                <>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(service.id)}>
                                        <Edit sx={{ color: '#2980b9' }} />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(service.id)}>
                                        <Delete sx={{ color: '#e74c3c' }} />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemText
                                primary={service.title}
                                secondary={service.description}
                            />
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Box>
    );
};

export default ServiceList;
