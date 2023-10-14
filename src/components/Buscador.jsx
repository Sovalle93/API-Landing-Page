import React, { useState } from 'react';
import MiApi from './MiAPI.jsx';

const Buscador = () => {
    const [buscarJuego, setBuscarJuego] = useState('');
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    const handleSearchInput = (e) => {
        setBuscarJuego(e.target.value);
    };

    const handleSortClick = () => {
        setOrdenAscendente(!ordenAscendente);
    };

    return (
        <>
            <section className='filter'>
                <h1>Lista de Juegos</h1>
                <input
                    name="juego"
                    className='search'
                    placeholder="Buscar un juego"
                    value={buscarJuego}
                    onChange={handleSearchInput}
                />
                <button onClick={handleSortClick}>Ordenar {ordenAscendente ? 'Z-A' : 'A-Z'}</button>
            </section>
            <MiApi searchTerm={buscarJuego} ordenAscendente={ordenAscendente} />
        </>
    );
};

export default Buscador;
