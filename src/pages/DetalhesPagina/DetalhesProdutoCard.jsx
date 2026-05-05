import React from "react";
import { useNavigate } from 'react-router-dom';

const DetalhesProdutoCard = ({ produto }) => {

  const navigate = useNavigate();

  const irParaReserva = () => {
    navigate('/reserva', { state: { idEstoque: produto.idModelo } });
  };
  
  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 mt-6">
      
      {/* LADO ESQUERDO: Imagem */}
      <div className="w-full lg:w-1/2">
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-4">
          <img 
            src={produto.imagemPrincipalUrl} 
            className="max-h-full max-w-full object-contain" 
            alt={produto.nome} 
          />
        </div>
        {/* Carrossel de Miniaturas (opcional para o TCC) */}
        {produto.imagensUrls && produto.imagensUrls.length > 0 && (
          <div className="flex gap-2 mt-4">
            {produto.imagensUrls.map((url, index) => (
              <img key={index} src={url} className="w-20 h-20 rounded-lg cursor-pointer border hover:border-orange-500 transition-all" alt="Minitatura" />
            ))}
          </div>
        )}
      </div>

      {/* LADO DIREITO: Info e Compra */}
      <div className="w-full lg:w-1/2 space-y-6 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Categoria e Nome */}
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{produto.categoria}</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">{produto.nome}</h1>
          </div>

          {/* Avaliação (Estrelinhas) */}
          <div className="flex items-center gap-1">
            <span className="text-xl text-yellow-500">★★★★★</span>
            <span className="text-sm text-gray-400">({produto.avaliacaoMedia})</span>
          </div>

          {/* Preço */}
          <p className="text-3xl font-extrabold text-gray-950">
            R$ {produto.precoDiaria.toFixed(2)} <span className="text-base text-gray-400 font-normal">/ diária</span>
          </p>

          {/* Descrição */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <p className="text-gray-600 text-sm leading-relaxed">{produto.descricao}</p>
          </div>

          {/* Especificações Técnicas (Novos campos que você pediu) */}
          <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between border-r border-gray-200 pr-4">
              <span className="font-semibold text-gray-500">Altura:</span>
              <span className="text-gray-900 font-bold">{produto.altura?.toFixed(2)} m</span>
            </div>
            <div className="flex justify-between pl-2">
              <span className="font-semibold text-gray-500">Comprimento:</span>
              <span className="text-gray-900 font-bold">{produto.comprimento?.toFixed(2)} m</span>
            </div>
          </div>
        </div>

        {/* BOTÃO DE AÇÃO (Simples, fixo embaixo) */}
        <button button onClick={irParaReserva}
          className={`w-full text-white font-bold py-5 rounded-2xl text-xl transition-all shadow-lg ${produto.disponivel ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-100' : 'bg-gray-300 cursor-not-allowed'}`}
          disabled={!produto.disponivel}
        >
          {produto.disponivel ? 'Adicionar ao Carrinho' : 'Indisponível'}
        </button>
      </div>
    </div>
  );
};

export default DetalhesProdutoCard;