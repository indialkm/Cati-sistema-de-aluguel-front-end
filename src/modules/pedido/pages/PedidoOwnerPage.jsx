import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout/AdminLayout'; 
import FilterPedidoStatus from '../components/FilterPedidosStatus';
import CardItemPedidoOwner from '../components/CardItemPedidoOwner';
import  usePedido  from '../hooks/usePedido';

const PedidoOwnerPage = () => {
    const [filtroStatus, setFiltroStatus] = useState('');
    const { pedidos, loading, erro, paginacao, carregarPedidos } = usePedido();

    // Carregamento inicial e monitoramento do filtro
    useEffect(() => {
        carregarPedidos(filtroStatus, 0);
    }, [filtroStatus, carregarPedidos]);

    return (
        <AdminLayout>
            {/* Cabeçalho da Página */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Gestão de Pedidos</h1>
                <p className="text-gray-600 mt-2">
                    Monitore e gerencie todos os pedidos realizados na plataforma.
                </p>
            </div>

            {/* Componente de Filtro */}
            <section className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <FilterPedidoStatus 
                    statusAtual={filtroStatus} 
                    aoAlterar={(novoStatus) => setFiltroStatus(novoStatus)} 
                />
            </section>

            {/* Listagem de Pedidos */}
            <div className="space-y-4">
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
                        <span className="ml-3 text-gray-600 font-medium">Carregando pedidos...</span>
                    </div>
                ) : erro ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <p className="text-red-700">{erro}</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            {pedidos.length > 0 ? (
                                pedidos.map(pedido => (
                                    <CardItemPedidoOwner key={pedido.id} pedido={pedido} />
                                ))
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
                                    <p className="text-gray-500 text-lg">Nenhum pedido encontrado para este filtro.</p>
                                </div>
                            )}
                        </div>

                        {/* Paginação Estilizada */}
                        {pedidos.length > 0 && (
                            <div className="mt-8 flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
                                <div className="text-sm text-gray-700">
                                    Mostrando <span className="font-medium">{pedidos.length}</span> pedidos
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        disabled={paginacao.number === 0}
                                        onClick={() => carregarPedidos(filtroStatus, paginacao.number - 1)}
                                        className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        Anterior
                                    </button>
                                    <div className="flex items-center px-4 text-sm font-medium text-gray-900">
                                        Página {paginacao.number + 1} de {paginacao.totalPages}
                                    </div>
                                    <button 
                                        disabled={paginacao.number + 1 >= paginacao.totalPages}
                                        onClick={() => carregarPedidos(filtroStatus, paginacao.number + 1)}
                                        className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default PedidoOwnerPage;