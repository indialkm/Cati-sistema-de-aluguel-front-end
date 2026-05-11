import React from 'react';
import { Star } from 'lucide-react'; 

export const AvaliacaoLista = ({ avaliacoes, loading }) => {
    if (loading) return <p className="text-gray-500 italic">Carregando comentários...</p>;
    
    if (avaliacoes.length === 0) {
        return <p className="text-gray-400">Este item ainda não possui avaliações. Seja o primeiro!</p>;
    }

    return (
        <div className="space-y-6">
            {avaliacoes.map((av) => (
                <div key={av.id} className="flex gap-4 border-b border-gray-100 pb-6">
                    {/* Avatar Simples com a inicial */}
                    <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold shrink-0">
                        {av.nomeUsuario?.[0] || 'U'}
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-800">{av.nomeUsuario || "Usuário"}</h4>
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < av.nota ? "currentColor" : "none"} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {av.comentario}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};