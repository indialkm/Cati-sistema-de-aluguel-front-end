import React from "react";
import { useNavigate } from 'react-router-dom';

const DetalhesProdutoCard = ({ produto }) => {
  const navigate = useNavigate();

  // BOAS PRÁTICAS: Valores Padrão (Null Safety)
  // Se o Back-end não enviar algo, o Front não quebra.
  const info = {
    id: produto.id || produto.idModelo,
    nome: produto.nome || "Equipamento sem nome",
    categoria: produto.categoria || "Geral",
    preco: produto.precoFinal || produto.precoDiaria || 0,
    descricao: produto.descricao || "Nenhuma descrição disponível.",
    imagemPrincipal: produto.fotosModelos?.[0] || produto.imagemPrincipalUrl || "https://placehold.co/600x600?text=Sem+Imagem",
    todasImagens: produto.fotosModelos || produto.imagensUrls || [],
    disponivel: produto.estaDisponivel ?? produto.disponivel,
    // No seu DTO atual você não tem avaliação, então podemos fixar ou deixar opcional
    avaliacao: produto.avaliacaoMedia || "5.0"
  };

  const irParaReserva = () => {
    navigate('/reserva', { state: { idEstoque: info.id } });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 mt-6 transition-all hover:shadow-2xl">
      
      {/* SEÇÃO DE MÍDIA (Abstraída visualmente) */}
      <div className="w-full lg:w-1/2 space-y-4">
        <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center p-6 border border-gray-50">
          <img 
            src={info.imagemPrincipal} 
            className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105" 
            alt={info.nome} 
          />
        </div>
        
        {/* Carrossel Inteligente */}
        {info.todasImagens.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {info.todasImagens.map((url, index) => (
              <img 
                key={index} 
                src={url} 
                className="w-20 h-20 rounded-xl cursor-pointer border-2 border-transparent hover:border-orange-500 object-cover transition-all" 
                alt={`Miniatura ${index}`} 
              />
            ))}
          </div>
        )}
      </div>

      {/* SEÇÃO DE CONTEÚDO */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between py-2">
        <div className="space-y-6">
          <header>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-widest">
              {info.categoria}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-3 tracking-tight">{info.nome}</h1>
            
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400 text-lg">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <span className="text-sm font-medium text-gray-400">({info.avaliacao})</span>
            </div>
          </header>

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-gray-950">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(info.preco)}
            </span>
            <span className="text-gray-400 font-medium">/ metro</span>
          </div>

          <article className="prose prose-sm">
            <h4 className="text-gray-900 font-bold mb-2">Sobre este item</h4>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {info.descricao}
            </p>
          </article>

          {/* Especificações Técnicas Dinâmicas */}
          {(produto.altura || produto.comprimento) && (
            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold">Altura</p>
                  <p className="text-lg font-bold text-gray-800">{produto.altura?.toFixed(2)} m</p>
               </div>
               <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase font-bold">Largura</p>
                  <p className="text-lg font-bold text-gray-800">{produto.comprimento?.toFixed(2)} m</p>
               </div>
            </div>
          )}
        </div>

        {/* CTA (Call to Action) */}
        <div className="mt-8">
          <button 
            onClick={irParaReserva}
            disabled={!info.disponivel}
            className={`w-full py-5 rounded-2xl text-xl font-black transition-all transform active:scale-95 shadow-xl
              ${info.disponivel 
                ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white hover:shadow-orange-200' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
          >
            {info.disponivel ? 'RESERVAR AGORA' : 'INDISPONÍVEL NO MOMENTO'}
          </button>
          {info.disponivel && (
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">
              * Verifique a disponibilidade para sua data no próximo passo.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesProdutoCard;