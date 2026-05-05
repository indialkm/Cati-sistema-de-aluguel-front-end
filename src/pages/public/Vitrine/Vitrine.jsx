// src/pages/Vitrine/index.jsx

import { useEffect, useState } from 'react';
import api from '../../../services/api';

import NavBar from '../../../components/Navbar/Navbar';
import Slideshow from '../../../components/Slidershow/Slidershow';
import EstoqueGrid from '../../../modules/estoque/components/EstoqueGrid';

export default function Vitrine() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstoque = async () => {
      try {
        const response = await api.get('/estoque'); // mantém igual ao que já funciona
        setItens(response.data.content || []);
      } catch (error) {
        console.error("Erro ao buscar vitrine:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarEstoque();
  }, []);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-[#F6F8FA] pb-20">
        <div className="max-w-7xl mx-auto px-4 pt-6">

          {/* Slideshow */}
          <Slideshow />

          {/* Título */}
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Mais procurados em Tendas e Equipamentos
            </h2>

            <button className="text-blue-600 text-sm font-bold hover:underline">
              Ver todos
            </button>
          </div>

          {/* Grid */}
          <EstoqueGrid
            listaEstoque={itens}
            loading={loading}
          />

        </div>
      </main>
    </>
  );
}