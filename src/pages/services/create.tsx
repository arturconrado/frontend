import React, { useState } from 'react';

const CreateService = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para salvar o serviço no backend
        console.log({ title, description });
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold">Cadastrar Serviço</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label>Título</label>
        <input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
    className="border p-2"
        />
        </div>
        <div>
        <label>Descrição</label>
        <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    className="border p-2"
        />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Cadastrar</button>
        </form>
        </div>
);
};

export default CreateService;
