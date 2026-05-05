import React from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react'; 

export default function EstoqueCard({ estoque, linkPara, isManagement = false, onEdit, onDelete }) {
  const fotoPrincipal = estoque.fotosModelos?.[0]?.url || '/imagens/placeholder.jpg';

  const rotaFinal = linkPara || `/detalhes/${estoque.id}`;

  const cardStyles = isManagement
    ? "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full max-w-xs"
    : "bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition flex flex-col h-full";

  const imageContainerStyles = isManagement
    ? "relative aspect-video w-full overflow-hidden" 
    : "relative aspect-4/3 w-full overflow-hidden";

  return (
    <div className={cardStyles}>

      {/* Imagem  */}
      <Link to={rotaFinal} className="block overflow-hidden">
        <div className={imageContainerStyles}>
          <img
            src={fotoPrincipal}
            alt={estoque.nome}
            className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      {/* Conteúdo */}
      <div className={isManagement ? "p-3 flex flex-col grow" : "p-4 flex flex-col grow"}>

        {!isManagement && (
          <span className="text-xs text-blue-600 font-semibold mb-1 uppercase">
            {estoque.categoria}
          </span>
        )}

        <Link to={`/detalhes/${estoque.id}`}>
          <h3 className={`${isManagement ? 'text-sm' : 'text-lg'} font-bold text-gray-900 hover:text-blue-600 transition-colors`}>
            {estoque.nome}
          </h3>
        </Link>

        {/* Descrição */}
        {!isManagement && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
            {estoque.descricao || 'Sem descrição disponível.'}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between">
          <span className={`${isManagement ? 'text-sm' : 'text-lg'} font-bold text-blue-700`}>
            R$ {estoque.precoBase?.toFixed(2) || '0.00'}
          </span>

          {/* Quantidade: Informação vital para o DONO */}
          {isManagement && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
              Qtd: {estoque.quantidade}
            </span>
          )}
        </div>

        {/* ÁREA DE GESTÃO (BOTÕES) */}
        {isManagement && (
          <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.preventDefault(); // Evita navegar se houver link pai
                onEdit(estoque);
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Editar Equipamento"
            >
              <Pencil size={16} />
            </button> 
            <button
              onClick={(e) => {
                e.preventDefault();
                onDelete(estoque.id); 
              }}
              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Excluir do Estoque"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}