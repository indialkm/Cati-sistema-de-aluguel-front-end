import React from 'react';

export const FiltroEstoque = ({ filtros, setFiltros, aplicarFiltros }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Se for largura, convertemos para número ou mandamos vazio
        setFiltros(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* 1. MODELO (Que o Java usa para filtrar o NOME) */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Modelo/Nome</label>
                <input 
                    type="text" 
                    name="modelo" // Nome igual ao parâmetro do Java
                    value={filtros.modelo}
                    onChange={handleChange}
                    placeholder="Ex: 3x3 ou Lateral"
                    className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* 2. CATEGORIA (Igual às tabelas do seu banco) */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Categoria</label>
                <select 
                    name="categoria" 
                    value={filtros.categoria} 
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                >
                    <option value="">Todas</option>
                    <option value="Tendas">Tendas</option>
                    <option value="Cadeiras">Cadeiras</option>
                    <option value="Tendas dupla divisa">Tendas Dupla Divisa</option>
                </select>
            </div>

            {/* 3. LARGURA (Substituindo o "Tamanho" que não existia no banco) */}
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Largura (m)</label>
                <input 
                    type="number"
                    name="largura"
                    value={filtros.largura}
                    onChange={handleChange}
                    placeholder="Ex: 3 ou 5"
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <button 
                onClick={aplicarFiltros}
                className="bg-blue-600 text-white p-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
                Filtrar Equipamentos
            </button>
        </div>
    );
};