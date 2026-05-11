import React, { useState } from 'react';
import { useAvaliacao } from '../hooks/useAvaliacao';

export const AvaliacaoForm = ({ idEstoque, aoEnviarSucesso }) => {
    const [nota, setNota] = useState(5);
    const [comentario, setComentario] = useState('');
    const { enviarAvaliacao, loading, erro } = useAvaliacao();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await enviarAvaliacao(idEstoque, nota, comentario);
            setComentario('');
            if (aoEnviarSucesso) aoEnviarSucesso();
            alert("Avaliação enviada!");
        } catch (err) {
            // Erro já tratado no hook
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Avaliar Produto</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Sua Nota</label>
                <select 
                    value={nota} 
                    onChange={(e) => setNota(Number(e.target.value))}
                    className="mt-1 block w-full p-2 border rounded-md"
                >
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Estrelas</option>)}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Comentário</label>
                <textarea 
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md h-24"
                    placeholder="Conte sua experiência com este item..."
                    required
                />
            </div>

            {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? "Enviando..." : "Publicar Avaliação"}
            </button>
        </form>
    );
};

export default AvaliacaoForm;