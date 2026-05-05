import React, { useState, useEffect } from 'react';

export default function MenuChecklist({ acao, onConfirmar, onClose, loading }) {
    const [fotos, setFotos] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [erroLocal, setErroLocal] = useState("");
    const [respostas, setRespostas] = useState({
        estruturaOk: false,
        lonaLimpa: false,
        observacoes: ""
    });

    // Gera previews das fotos selecionadas para melhorar a UX
    useEffect(() => {
        if (fotos.length === 0) {
            setPreviews([]);
            return;
        }
        const objectUrls = fotos.map(foto => URL.createObjectURL(foto));
        setPreviews(objectUrls);

        // Cleanup para evitar vazamento de memória
        return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    }, [fotos]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validação de tipo de arquivo
        const arquivosInvalidos = files.filter(f => !f.type.startsWith('image/'));
        if (arquivosInvalidos.length > 0) {
            setErroLocal("Apenas imagens são permitidas.");
            return;
        }

        setErroLocal("");
        setFotos(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (fotos.length === 0) {
            setErroLocal("A vistoria exige ao menos uma foto comprobatória.");
            return;
        }

        try {
            await onConfirmar(respostas, fotos);
        } catch (err) {
            setErroLocal("Falha ao enviar. Tente novamente.");
        }
    };

    const titulo = acao === 'montar' ? 'Vistoria de Saída (Montagem)' : 'Vistoria de Entrada (Retirada)';

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[9999] animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-gray-100 overflow-y-auto max-h-[90vh]">
                
                <header className="mb-6">
                    <h2 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                        {titulo}
                    </h2>
                    <p className="text-gray-500 text-sm">Preencha os dados técnicos da tenda antes de prosseguir.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Checklist */}
                    <div className="grid grid-cols-1 gap-3">
                        <CheckItem 
                            label="Estrutura em boas condições?" 
                            checked={respostas.estruturaOk}
                            onChange={val => setRespostas({...respostas, estruturaOk: val})}
                        />
                        <CheckItem 
                            label="Lona limpa e sem furos?" 
                            checked={respostas.lonaLimpa}
                            onChange={val => setRespostas({...respostas, lonaLimpa: val})}
                        />
                    </div>

                    {/* Observações */}
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">Observações Técnicas</label>
                        <textarea 
                            className="w-full border-2 border-gray-100 p-4 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all resize-none bg-gray-50" 
                            rows="3"
                            placeholder="Descreva avarias, se houver..."
                            value={respostas.observacoes}
                            onChange={e => setRespostas({...respostas, observacoes: e.target.value})}
                        />
                    </div>

                    {/* Upload de Fotos */}
                    <div className={`p-6 border-2 border-dashed rounded-2xl transition-colors ${fotos.length > 0 ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                        <label className="block text-center cursor-pointer">
                            <span className="block text-sm font-bold text-gray-700 mb-1">Anexar Fotos da Tenda</span>
                            <span className="block text-xs text-gray-400 mb-4">Clique para selecionar ou arraste</span>
                            <input 
                                type="file" 
                                multiple 
                                accept="image/*"
                                onChange={handleFileChange} 
                                className="hidden"
                            />
                            <div className="inline-block bg-white px-4 py-2 rounded-full shadow-sm text-xs font-bold border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all">
                                Selecionar Arquivos
                            </div>
                        </label>

                        {/* Preview das Imagens */}
                        {previews.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4 justify-center">
                                {previews.map((url, index) => (
                                    <img key={index} src={url} className="w-12 h-12 object-cover rounded-lg border border-white shadow-sm" alt="Preview" />
                                ))}
                            </div>
                        )}
                    </div>

                    {erroLocal && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-lg animate-bounce">
                            <p className="text-red-600 text-xs font-bold text-center">{erroLocal}</p>
                        </div>
                    )}

                    {/* Ações */}
                    <footer className="flex gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-xl font-bold text-gray-400 hover:bg-gray-100 transition-all"
                            disabled={loading}
                        >
                            Voltar
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className={`flex-[2] py-4 rounded-xl font-black text-white shadow-lg shadow-blue-200 transition-all ${
                                loading ? 'bg-blue-300 scale-95' : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-300 active:scale-95'
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : 'Finalizar Checklist'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}

// Sub-componente para manter o código limpo
function CheckItem({ label, checked, onChange }) {
    return (
        <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${checked ? 'border-blue-500 bg-blue-50' : 'border-gray-50 bg-gray-50 hover:bg-gray-100'}`}>
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-200'}`}>
                {checked && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
            </div>
            <input 
                type="checkbox" 
                className="hidden"
                checked={checked}
                onChange={e => onChange(e.target.checked)} 
            />
            <span className={`text-sm font-bold ${checked ? 'text-blue-700' : 'text-gray-600'}`}>{label}</span>
        </label>
    );
}