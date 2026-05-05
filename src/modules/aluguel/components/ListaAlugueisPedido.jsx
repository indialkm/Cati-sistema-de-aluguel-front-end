import React, { useEffect } from 'react';
import { useAluguel } from '../hooks/useAluguel';
import CardItemAluguel from './CardItemAluguel';

const ListaAlugueisPedido = ({ idPedido }) => {
    const { alugueis, loading, erro, buscarPorPedido } = useAluguel();

    useEffect(() => {
        if (idPedido) {
            buscarPorPedido(idPedido);
        }
    }, [idPedido, buscarPorPedido]); 

    if (loading) return <p>Carregando itens do pedido...</p>;
    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

    return (
        <div>
            {alugueis.length > 0 ? (
                alugueis.map((aluguel) => (
                    <CardItemAluguel key={aluguel.id} aluguel={aluguel} />
                ))
            ) : (
                <p>Nenhum item encontrado para o pedido #{idPedido}.</p>
            )}
        </div>
    );
};

export default ListaAlugueisPedido;