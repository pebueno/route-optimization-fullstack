import React from 'react';

const SearchInput = ({ search, setSearch, onSubmitForm }) => {
    return (
        <div className="d-flex mb-3">

            <form className="d-flex me-4 w-75" onSubmit={onSubmitForm}>
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
            <button className="btn btn-outline-secondary w-25" data-bs-toggle="modal" data-bs-target="#exampleModal">Otimizar visita</button>
        </div>
    );
};

export default SearchInput;