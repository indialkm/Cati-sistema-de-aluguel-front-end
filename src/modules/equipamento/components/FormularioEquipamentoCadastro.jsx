import React, { useState } from 'react';
import { useEquipamento } from '../hook/useEquipamento';
import { useParams, useNavigate } from 'react-router-dom';

export function FormularioEquipamentoCadastro() {
    const { id: idEstoqueURL } = useParams();
    const navigate = useNavigate();
    const { cadastrar, loading, erro } = useEquipamento();
    
    // Alinhado exatamente com o seu EquipamentoRequest.java
    const [formData, setFormData] = useState({
        numeroSerie: '',
        modelo: '',
        cor: '',
        observacoesInternas: '',
        altura: '',
        peso: '',
        preco: '',
        condicao: 'NOVO', // Valor padrão do Enum
        statusEquipamento: 'DISPONIVEL' // Valor padrão (ajuste conforme seu Enum)
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Lógica para converter strings em números onde o DTO pede Double
        const val = (name === 'altura' || name === 'peso' || name === 'preco') 
            ? parseFloat(value) 
            : value;
            
        setFormData(prev => ({ ...prev, [name]: val }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await cadastrar(idEstoqueURL, formData); 
    
    if (sucesso) { 
        alert("Equipamento registrado com sucesso!");
        navigate(-1);
    }
};

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* GRID PARA CAMPOS LADO A LADO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Modelo */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Modelo/Nome</label>
                    <input type="text" name="modelo" required onChange={handleChange} className="w-full border rounded-xl p-2.5" placeholder="Ex: Piramidal 5x5" />
                </div>

                {/* Número de Série */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Nº de Série</label>
                    <input type="text" name="numeroSerie" required onChange={handleChange} className="w-full border rounded-xl p-2.5" />
                </div>

                {/* Cor */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Cor</label>
                    <input type="text" name="cor" onChange={handleChange} className="w-full border rounded-xl p-2.5" />
                </div>

                {/* Nível de Conservação (O SEU ENUM) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Condição (Conservação)</label>
                    <select 
                        name="condicao" 
                        value={formData.condicao} 
                        onChange={handleChange}
                        className="w-full border rounded-xl p-2.5 bg-white"
                    >
                        <option value="NOVO">Novo</option>
                        <option value="EXCELENTE">Excelente</option>
                        <option value="BOM">Bom</option>
                        <option value="AVARIADO">Avariado</option>
                        <option value="MANUTENCAO">Manutenção</option>
                        <option value="SUCATA">Sucata</option>
                    </select>
                </div>
            </div>

            {/* FINANCEIRO E DIMENSÕES */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Preço (Metro)</label>
                    <input type="number" step="0.01" name="preco" required onChange={handleChange} className="w-full border rounded-xl p-2.5" placeholder="0.00" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Altura (m)</label>
                    <input type="number" step="0.1" name="altura" onChange={handleChange} className="w-full border rounded-xl p-2.5" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700">Peso (kg)</label>
                    <input type="number" step="0.1" name="peso" onChange={handleChange} className="w-full border rounded-xl p-2.5" />
                </div>
            </div>

            {/* Observações */}
            <div>
                <label className="block text-sm font-semibold text-gray-700">Observações Internas</label>
                <textarea 
                    name="observacoesInternas" 
                    rows="3" 
                    onChange={handleChange} 
                    className="w-full border rounded-xl p-2.5" 
                    placeholder="Detalhes sobre avarias, histórico ou lona..."
                ></textarea>
            </div>

            {erro && <div className="p-3 bg-red-100 text-red-700 rounded-lg">{erro}</div>}

            <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => navigate(-1)} className="flex-1 py-3 border rounded-xl font-semibold">Cancelar</button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg">
                    {loading ? 'Salvando...' : 'Finalizar Cadastro'}
                </button>
            </div>
        </form>
    );
}