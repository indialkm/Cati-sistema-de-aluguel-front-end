import React, { useEffect } from 'react';
import useEquipamento from '../hook/useEquipamento';
import EquipamentoCard from '../components/EquipamentoCard';
import { Link, useParams } from 'react-router-dom';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import { Plus } from 'lucide-react';

export function ExibirEquipamento() {
  const { id } = useParams();
  const { itens, loading, listarPorEstoque } = useEquipamento();

  useEffect(() => {
    if (id) listarPorEstoque(id);
  }, [id]);

  // RENDERIZAÇÃO
  return (
    <AdminLayout>
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Div para agrupar o título e a descrição à esquerda */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Equipamentos</h1>
          <p className="text-gray-500">Visualize e gerencie as unidades individuais do seu estoque.</p>
        </div>

        {/* O Link agora ficará à direita no desktop e com tamanho automático */}
        <Link
          to={`/cadastrar-equipamento/${id}`}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-md no-underline w-full md:w-auto self-start md:self-center"
        >
          <Plus size={18} />
          Novo Equipamento
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itens.map(e => <EquipamentoCard key={e.id} equipamento={e} />)}
      </div>
    </AdminLayout>
  );
}

export default ExibirEquipamento;