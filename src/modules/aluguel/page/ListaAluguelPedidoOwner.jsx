import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import CardItemAluguel from '../components/CardItemAluguel';
import { useAluguel } from '../hooks/useAluguel';

const ListaAlugueisPedidoOwner = () => {
    const { idPedido } = useParams();
    const navigate = useNavigate();
    const { alugueis, loading, erro, buscarPorPedido } = useAluguel();

    useEffect(() => {
        if (idPedido) {
            buscarPorPedido(idPedido);
        }
    }, [idPedido, buscarPorPedido]);

    return (
        <AdminLayout>
            {/* Cabeçalho com botão de voltar */}
            <div className="mb-8">
                <button 
                    onClick={() => navigate('/admin/pedidos')}
                    className="flex items-center text-blue-900 hover:text-blue-700 font-medium transition-colors mb-4"
                >
                    <span className="mr-2">←</span> Voltar para Pedidos
                </button>
                
                <h1 className="text-3xl font-bold text-gray-900">Itens do Pedido</h1>
                <p className="text-gray-600 mt-2">
                    Gerenciamento individual de aluguéis para o Pedido <span className="font-mono font-bold text-blue-900">#{idPedido?.substring(0, 8)}</span>
                </p>
            </div>

            {/* Conteúdo Principal */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                        <p className="mt-4 text-gray-500">Buscando itens do pedido...</p>
                    </div>
                ) : erro ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                        {erro}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {alugueis.length > 0 ? (
                            alugueis.map((aluguel) => (
                                <CardItemAluguel 
                                    key={aluguel.id} 
                                    aluguel={aluguel} 
                                    isAdmin={true} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <p className="text-gray-400 text-lg">Nenhum aluguel vinculado a este pedido.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ListaAlugueisPedidoOwner;