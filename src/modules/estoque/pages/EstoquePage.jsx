import React, { useState, useEffect } from 'react';
import EstoqueGrid from '../components/EstoqueGrid';
import { FiltroEstoque } from '../components/FiltroEstoque';
import { useEstoque } from '../hooks/useEstoque';

export default function EstoqueViewPage() {
    
    const [filtros, setFiltros] = useState({
        categoria: '',
        modelo: '',
        largura: '',
        qtdMinima: 0
    });


    const { listaEstoque, loading, buscarEstoqueFiltrado, erro } = useEstoque();

    // Carregamento inicial
    useEffect(() => {
        buscarEstoqueFiltrado(filtros);
    }, []); 

    const handleFiltrar = () => {
        buscarEstoqueFiltrado(filtros);
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Nosso Estoque</h1>
                <p className="text-gray-600">Consulte a disponibilidade de equipamentos em tempo real.</p>
            </header>

            <FiltroEstoque 
                filtros={filtros} 
                setFiltros={setFiltros} 
                aplicarFiltros={handleFiltrar} 
            />

            {/* Exibição de Erro caso a API falhe */}
            {erro && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {erro}
                </div>
            )}

            <div className="mt-8">
                {/* Se não estiver carregando e a lista for vazia, mostra aviso */}
                {!loading && listaEstoque.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-500 text-xl">Nenhum equipamento encontrado com estes filtros.</p>
                        <button 
                            onClick={() => {
                                const reset = { categoria: '', modelo: '', largura: '', qtdMinima: 0 };
                                setFiltros(reset);
                                buscarEstoqueFiltrado(reset);
                            }}
                            className="mt-4 text-blue-600 underline"
                        >
                            Limpar todos os filtros
                        </button>
                    </div>
                ) : (
                    <EstoqueGrid 
                        listaEstoque={listaEstoque} 
                        loading={loading} 
                    />
                )}
            </div>
        </div>
    );
}