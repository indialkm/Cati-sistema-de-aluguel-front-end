// src/components/Vitrine/ProductCard.jsx
import { useNavigate } from 'react-router-dom'; // 1. Importar o hook

export default function ProductCard({ item }) {
  const navigate = useNavigate(); // 2. Inicializar o hook

  const capa = item.fotosModelos && item.fotosModelos.length > 0 
    ? item.fotosModelos[0] 
    : 'https://via.placeholder.com/300x200?text=Sem+Foto';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
      
      {/* 3. IMAGEM (Removido o onClick daqui para focar no botão) */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img 
          src={capa} 
          alt={item.nome} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-(--color-primary-light) text-white px-3 py-1 text-[10px] font-bold uppercase rounded-full shadow-lg">
          {item.categoria || 'Tenda'}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-(--color-primary-main) font-bold text-base line-clamp-1 mb-1">
          {item.nome}
        </h3>
        
        <p className="text-2xl font-black text-(--color-accent-orange)]">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoBase)}
        </p>
        
        <div className="flex items-center justify-between mt-3">
           <p className="text-[10px] text-gray-400 italic">
            {item.quantidade} em estoque
          </p>

          {/* 4. ONDE O CLIQUE REALMENTE ACONTECE */}
          <button 
            onClick={() => navigate(`/detalheProduto/${item.id}`)}
            className="text-(--color-primary-main) font-bold text-xs hover:scale-105 active:scale-95 transition-transform"
          >
            VER DETALHES +
          </button>
        </div>
      </div>
    </div>
  );
}