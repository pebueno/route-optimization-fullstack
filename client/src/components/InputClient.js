import React, { useState } from 'react';

const InputClient = () => {
    const [client, setClient] = useState({ name: '', email: '', telephone: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:5000/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        })
            .then(response => response.json())
            .then(() => window.location = "/")
            .catch(error => console.error('Error adding client:', error));
    };

    return (
        <div>
            <h2 className="text-right mt-5">Adicionar novo cliente</h2>
            <form onSubmit={handleSubmit} className="d-flex">
                <input type="text" name="name" value={client.name} onChange={handleInputChange} className="form-control me-2" placeholder="Nome" required />

                <input type="email" name="email" value={client.email} onChange={handleInputChange} className="form-control me-2" placeholder="E-mail" required />

                <input type="tel" name="telephone" value={client.telephone} onChange={handleInputChange} className="form-control me-2" placeholder="Telefone" required />

                <button type="submit" className="btn btn-success">Adicionar</button>
            </form>
        </div>
    )
}

export default InputClient;