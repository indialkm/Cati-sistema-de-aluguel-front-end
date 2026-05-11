import { useEffect, useState } from 'react';
import { useEstoque } from '../estoque/hooks/useEstoque';

import NavBar from '../../components/Navbar/Navbar';
import Slideshow from '../../components/Slidershow/Slidershow';
import EstoqueGrid from '../estoque/components/EstoqueGrid';
import { FiltroEstoque } from '../estoque/components/FiltroEstoque';

export default function Vitrine() {

  const [filtros, setFiltros] = useState({
    categoria: '',
    modelo: '',   // Antes estava 'tenda'
    largura: '',  // Antes estava 'tamanho'
    qtdMinima: 0  // Antes estava 1 (Mude para 0 para mostrar tudo no início)
  });

const { itens: listaEstoque, loading, buscarEstoqueFiltrado } = useEstoque()

  useEffect(() => {
    // Busca inicial com os filtros limpos
    buscarEstoqueFiltrado(filtros);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiltrar = () => {
    buscarEstoqueFiltrado(filtros);
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-[#F6F8FA] pb-20">
        <Slideshow />

        <div className="max-w-7xl mx-auto px-4 pt-10">

          <div className="mb-10">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
              O que você procura hoje?
            </h2>
            <FiltroEstoque
              filtros={filtros}
              setFiltros={setFiltros}
              aplicarFiltros={handleFiltrar}
            />
          </div>

          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Tendas e Equipamentos
              </h2>
              <p className="text-gray-500 text-sm">
                Encontre o item perfeito para o seu evento
              </p>
            </div>

            {/* Feedback visual de contagem de itens */}
            {!loading && (
              <span className="text-sm text-gray-400 font-medium bg-white px-3 py-1 rounded-full shadow-sm border">
                {listaEstoque?.length || 0} itens disponíveis
              </span>
            )}
          </div>

          {/* Tratamento de Lista Vazia com Proteção ?. */}
          {!loading && listaEstoque?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum equipamento disponível no momento.</p>
            </div>
          ) : (
            <EstoqueGrid
              listaEstoque={listaEstoque || []} // Garante que nunca envie undefined para o Grid
              loading={loading}
              isManagement={false}
            />
          )}

        </div>
      </main>
    </>
  );
}