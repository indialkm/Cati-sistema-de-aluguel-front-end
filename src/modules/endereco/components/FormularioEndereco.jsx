import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function FormularioEndereco({ aoSalvar, loading }) {
  const [formData, setFormData] = useState({
    cep: '', 
    logradouro: '', 
    numero: '', 
    complemento: '',
    bairro: '', 
    cidade: '', 
    uf: ''
  });
  
  const [cepLoading, setCepLoading] = useState(false);

  // CORREÇÃO 1: Nome da função de estado estava errado (setCpLoading)
  // CORREÇÃO 2: Adicionado tratamento para não travar o componente em caso de erro na API externa
  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      setCepLoading(true); // Estava setCpLoading (causava erro de referência)
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!res.data.erro) {
          setFormData(prev => ({
            ...prev,
            logradouro: res.data.logradouro || '',
            bairro: res.data.bairro || '',
            cidade: res.data.localidade || '',
            uf: res.data.uf || ''
          }));
        }
      } catch (err) { 
        console.error("Erro ao buscar CEP:", err); 
      } finally { 
        setCepLoading(false); 
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
        
        {/* Coluna Esquerda */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-blue-600 border-b pb-2">Novo Endereço</h3>
          
          <div className="relative">
            <label className="text-sm font-semibold text-gray-700">CEP</label>
            <input 
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              name="cep" 
              placeholder="00000-000" 
              value={formData.cep} // CORREÇÃO 3: Inputs precisam ser controlados (value={formData...})
              onChange={handleChange} 
              onBlur={handleCepBlur} 
            />
            {cepLoading && <Loader2 className="absolute right-3 top-9 animate-spin text-blue-500" size={20} />}
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">Logradouro</label>
            <input 
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              name="logradouro" 
              value={formData.logradouro} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-gray-700">Número</label>
              <input 
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                name="numero" 
                placeholder="Ex: 123" 
                value={formData.numero} // CORREÇÃO 4: Adicionado value
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">Complemento</label>
              <input 
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                name="complemento" 
                placeholder="Apto/Bloco" 
                value={formData.complemento} // CORREÇÃO 5: Adicionado value
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-transparent border-b pb-2 hidden lg:block">.</h3>
          
          <div>
            <label className="text-sm font-semibold text-gray-700">Bairro</label>
            <input 
              className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
              name="bairro" 
              value={formData.bairro} 
              onChange={handleChange} 
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-semibold text-gray-700">Cidade</label>
              <input 
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none"
                name="cidade" 
                value={formData.cidade} 
                onChange={handleChange} 
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700">UF</label>
              <input 
                className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-center"
                name="uf" 
                value={formData.uf} 
                onChange={handleChange} 
                maxLength="2" 
              />
            </div>
          </div>

          <button 
            type="button" // Boa prática: definir o tipo do botão
            onClick={() => aoSalvar(formData)}
            disabled={loading}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <CheckCircle size={20} />}
            Confirmar este endereço
          </button>
        </div>
      </div>
    </div>
  );
}