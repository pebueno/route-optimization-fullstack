

import React from 'react';

const ModalList = ({ sortedClients }) => {
    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Ordem otimizada de visitação dos clientes</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nome</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Localização</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedClients.map((client, i) => (
                                    <tr key={client.client_id}>
                                        <td>{i + 1}</td>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.telephone}</td>
                                        <td>{client.x}, {client.y}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalList;