import React, { useState, useEffect } from 'react';
import EstoqueGrid from '../components/EstoqueGrid';
import { FiltroEstoque } from './FiltroEstoque';
import { useEstoque } from '../hooks/useEstoque';

export default function EstoqueViewPage() {
   
    const [filtros, setFiltros] = useState({
        categoria: '',
        modelo: '',
        largura: '',
        qtdMinima: 1 
    });

    const { listaEstoque, loading, buscarComFiltros } = useEstoque();

    useEffect(() => {
        buscarComFiltros(filtros);
    }, []);


    const handleFiltrar = () => {
        buscarComFiltros(filtros);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Nosso Estoque</h1>

           
            <FiltroEstoque 
                filtros={filtros} 
                setFiltros={setFiltros} 
                aplicarFiltros={handleFiltrar} 
            />

            <EstoqueGrid 
                listaEstoque={listaEstoque} 
                loading={loading} 
            />
        </div>
    );
}