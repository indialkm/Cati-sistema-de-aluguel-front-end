// TendaGrid.jsx
import React from 'react';
import EstoqueCard from './EstoqueCard';

export default function EstoqueGrid({
  listaEstoque,
  loading,
  isManagement = false,
  onDelete,
  linkDestino
}) {

  
  if (loading) {
    return <div className="text-center text-gray-500 p-10">Carregando tendas...</div>;
  }

  if (!listaEstoque || listaEstoque.length === 0) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-6 rounded-lg text-center my-10">
        <h3 className="text-lg font-bold">Nenhuma tenda disponível no momento.</h3>
        <p>Estamos trabalhando para reabastecer nosso estoque. Volte em breve!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {listaEstoque.map(estoque => (
        <EstoqueCard
          key={estoque.id}
          estoque={estoque}
          isManagement={isManagement}
          onDelete={onDelete}
          linkPara={typeof linkDestino === 'function' ? linkDestino(estoque.id) : undefined}
        />
      ))}
    </div>
  );
}