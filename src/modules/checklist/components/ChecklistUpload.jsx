import React, { useState } from 'react';
import { Camera, X, UploadCloud } from 'lucide-react';

const ChecklistUpload = ({ aoSalvar, loading }) => {
    const [fotos, setFotos] = useState([]);
    const [observacoes, setObservacoes] = useState("");

    const handleFileChange = (e) => {
        const novosArquivos = Array.from(e.target.files);
        setFotos((prev) => [...prev, ...novosArquivos]);
    };

    const removerFoto = (index) => {
        setFotos(fotos.filter((_, i) => i !== index));
    };

    const handleEnviar = () => {
        const dados = { observacoes }; // Seu ChecklistRequest DTO
        aoSalvar(dados, fotos);
    };

    // REGRA DE NEGÓCIO: Botão desativado se não houver fotos (conforme definido no Java)
    const podeEnviar = fotos.length > 0 && !loading;

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h4 className="font-bold mb-4">Registrar Vistoria (Obrigatório)</h4>
            
            <textarea 
                className="w-full p-2 border rounded mb-4"
                placeholder="Observações sobre o estado dos itens..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-2 mb-4">
                {fotos.map((foto, index) => (
                    <div key={index} className="relative h-24 bg-gray-100 rounded">
                        <img 
                            src={URL.createObjectURL(foto)} 
                            className="h-full w-full object-cover rounded" 
                            alt="Preview"
                        />
                        <button 
                            onClick={() => removerFoto(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                            <X size={12} />
                        </button>
                    </div>
                ))}
                
                <label className="border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center h-24 cursor-pointer hover:bg-gray-50">
                    <Camera className="text-gray-400" />
                    <span className="text-[10px] text-gray-500">Adicionar Foto</span>
                    <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
            </div>

            <button
                onClick={handleEnviar}
                disabled={!podeEnviar}
                className={`w-full p-3 rounded-lg font-bold text-white transition-all 
                    ${podeEnviar ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 cursor-not-allowed'}`}
            >
                {loading ? 'Enviando...' : 'Finalizar Checklist'}
            </button>
        </div>
    );
};