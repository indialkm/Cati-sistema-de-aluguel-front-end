import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEstoque } from '../hooks/useEstoque';
import DetalhesProdutoCard from '../components/DetalhesEquipamentoCard';
import Navbar from '../../../components/Navbar/Navbar';
const DetalhesProdutoPage = () => {
    const { id } = useParams();


    const { obterDetalhes, loading, erro, itemSelecionado } = useEstoque();

    useEffect(() => {
        console.log("ID capturado da URL:", id); // Adicione este log para testar!
        if (id) {
            obterDetalhes(id);
        }
    }, [id]);

    // Tratamento de estados visuais baseado no Hook
    if (loading) return <div className="text-center p-10 font-bold">Buscando detalhes da tenda...</div>;

    if (erro) return <div className="text-center p-10 text-red-500 font-semibold">{erro}</div>;

    return (
        <>

            <Navbar></Navbar>

            <div className="min-h-screen bg-gray-50 py-8">
                {itemSelecionado && (
                    <DetalhesProdutoCard produto={itemSelecionado} />
                )}
            </div>
        </>
    );

};

export default DetalhesProdutoPage;