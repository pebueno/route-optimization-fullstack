import React, { useState, useEffect } from 'react';
import SearchInput from './FilterClient';
import ModalList from './ModalList';

const ListClient = () => {
    const [search, setSearch] = useState("");
    const [clients, setClients] = useState([]);
    const [orderedClientIds, setOrderedClientIds] = useState([]);

    useEffect(() => {
        // Busca os clientes do Back end no momento que o componente é montado 
        fetch('http://localhost:5000/clients')
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));

        fetch('http://localhost:5000/bestroute')
            .then(response => response.json())
            .then(data => setOrderedClientIds(data))
            .catch(error => console.error('Error fetching the best route:', error));

    }, []);

    const onSubmitForm = async e => {
        e.preventDefault();

        fetch(`http://localhost:5000/clients/?search=${search}`)
            .then(response => response.json())
            .then(data => setClients(data))
            .catch(error => console.error('Error fetching clients:', error));

        console.log(clients)

    };

    // Ordena os ids dos clientes com base na rota otimizada
    const sortedClients = clients.slice().sort((a, b) => {
        return orderedClientIds.indexOf(a.client_id) - orderedClientIds.indexOf(b.client_id);
    });

    return (
        <div>

            <SearchInput search={search} setSearch={setSearch} onSubmitForm={onSubmitForm} />
            <ModalList sortedClients={sortedClients} />
            <h2 className="text-right my-4">Lista de Clientes</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Localização</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.client_id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.telephone}</td>
                            <td>{client.x}, {client.y}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListClient;