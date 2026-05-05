import React from 'react';
import { Trash2, Edit3, Info } from 'lucide-react'; // Ícones modernos
import { useEquipamento } from '../hook/useEquipamento';

export function EquipamentoCard({ equipamento, onRefresh }) {
  const { deletar, loading } = useEquipamento();

  // Função para definir a cor do status (mantive sua lógica original)
  const getStatusColor = (status) => {
    switch (status) {
      case 'DISPONIVEL': return 'text-green-600 bg-green-100';
      case 'ALUGADO': return 'text-blue-600 bg-blue-100';
      case 'MANUTENCAO': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Lógica de exclusão com confirmação
  const handleExcluir = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o equipamento ${equipamento.modelo}?`)) {
      const sucesso = await deletar(equipamento.id);
      if (sucesso) {
        alert("Equipamento removido!");
        if (onRefresh) onRefresh(); // Recarrega a lista automaticamente
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-all duration-300 relative group">
      
      {/* Botões de Ação Flutuantes (Aparecem no hover ou fixos em mobile) */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={() => console.log("Navegar para edição")} // Aqui você usaria o navigate
          className="p-2 bg-white border border-gray-100 text-blue-600 rounded-full shadow-sm hover:bg-blue-50 transition-colors"
          title="Editar"
        >
          <Edit3 size={16} />
        </button>
        <button 
          onClick={handleExcluir}
          disabled={loading}
          className="p-2 bg-white border border-gray-100 text-red-600 rounded-full shadow-sm hover:bg-red-50 transition-colors disabled:opacity-50"
          title="Excluir"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div>
        <div className="flex justify-between items-start mb-4 pr-16"> {/* pr-16 para não bater nos ícones */}
          <h3 className="text-lg font-bold text-gray-800">{equipamento.modelo}</h3>
          <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full ${getStatusColor(equipamento.statusEquipamento)}`}>
            {equipamento.statusEquipamento}
          </span>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Nº Série:</span> {equipamento.numeroSerie}</p>
          <p><span className="font-medium">Condição:</span> 
            <span className="ml-1 font-semibold text-gray-700">{equipamento.condicao}</span>
          </p>
          <p className="italic text-gray-400 mt-2 line-clamp-2">
            "{equipamento.observacoesInternas || 'Sem observações'}"
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-end">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Preço/Dia</p>
          <p className="text-xl font-bold text-indigo-600">
            R$ {equipamento.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default EquipamentoCard;