import React from 'react';
import { MapPin, Check } from 'lucide-react';

export default function ListaEnderecos({ enderecos, selecionado, aoSelecionar }) {
 

  return (
    <div className="space-y-4 mb-8">
      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
        <MapPin size={20} className="text-blue-600" />
        Seus endereços salvos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enderecos.map((end) => (
          <div
            key={end.id}
            onClick={() => aoSelecionar(end)}
            className={`cursor-pointer p-4 rounded-2xl border-2 transition-all flex justify-between items-start
              ${selecionado?.id === end.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <div className="space-y-1">
              <p className="font-bold text-gray-900">{end.logradouro}, {end.numero}</p>
              <p className="text-sm text-gray-500">{end.bairro} - {end.cidade}/{end.uf}</p>
              <p className="text-xs text-gray-400">CEP: {end.cep}</p>
            </div>
            {selecionado?.id === end.id && (
              <div className="bg-blue-500 rounded-full p-1 text-white">
                <Check size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}