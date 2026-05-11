import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useEstoque } from '../hooks/useEstoque';
import { useAvaliacao } from '../../avaliacao/hooks/useAvaliacao';
import { AvaliacaoForm } from '../../avaliacao/components/AvaliacaoForm'; 
import { AvaliacaoLista } from '../../avaliacao/components/AvaliacaoLista'; 
import DetalhesProdutoCard from '../components/DetalhesEquipamentoCard';
import Navbar from '../../../components/Navbar/Navbar';

const DetalhesProdutoPage = () => {
    const { id } = useParams();

    // Hooks de Dados
    const { obterDetalhes, loading: loadingEstoque, erro: erroEstoque, itemSelecionado } = useEstoque();
    const { avaliacoes, media, loading: loadingAvaliacao, carregarDadosAvaliacao } = useAvaliacao();

   useEffect(() => {
    if (id) {
        obterDetalhes(id);
        carregarDadosAvaliacao(id);
    }
}, [id]);

    // Estados de carregamento e erro
    if (loadingEstoque) return <div className="text-center p-10 font-bold">Buscando detalhes do item...</div>;
    if (erroEstoque) return <div className="text-center p-10 text-red-500 font-semibold">{erroEstoque}</div>;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Card Principal do Produto */}
                    {itemSelecionado && (
                        <DetalhesProdutoCard produto={itemSelecionado} />
                    )}

                    {/* Seção de Avaliações */}
                    <div className="mt-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-8 border-b pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Avaliações do Produto</h2>
                                <p className="text-gray-500 text-sm">O que outros clientes estão dizendo</p>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-bold text-yellow-500">{media.toFixed(1)}</span>
                                <span className="text-gray-400 text-lg"> / 5.0</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Lista de Comentários */}
                            <div className="lg:col-span-2">
                                <AvaliacaoLista 
                                    avaliacoes={avaliacoes} 
                                    loading={loadingAvaliacao} 
                                />
                            </div>

                            {/* Formulário lateral para nova avaliação */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-4">
                                    <AvaliacaoForm 
                                        idEstoque={id} 
                                        aoEnviarSucesso={() => carregarDadosAvaliacao(id)} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetalhesProdutoPage;