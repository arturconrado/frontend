import React, { useState } from 'react';

const Professionals = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica para buscar profissionais no backend
        console.log({ query });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Buscar Profissionais</h1>
            <form onSubmit={handleSearch}>
                <div>
                    <label>Buscar</label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                        className="border p-2"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2">Buscar</button>
            </form>
        </div>
    );
};

export default Professionals;
