import React, { useState, useEffect } from 'react';

const ListClient = () => {
    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Fetch clients from the backend when the component mounts
        fetch('http://localhost:5000/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const onSubmitForm = async e => {
        e.preventDefault();

        fetch(`http://localhost:5000/clients/?search=${search}`)
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));


    };

    return (
        <div className="mt-5" >
            <form className="d-flex mb-3" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    name="search"
                    placeholder="Buscar cliente"
                    className="form-control me-2"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-success">Buscar</button>
            </form>
            <h2>Client List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.client_id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.telephone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListClient;