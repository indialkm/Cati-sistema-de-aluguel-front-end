import React, { useState } from 'react';
import useAluguel from '../hooks/useAluguel'; // Importe o seu hook real aqui

const TesteHook = () => {
    // Pegamos as funções e estados exatamente como o seu Hook exporta
    const { 
        processarChecklist, 
        loading, 
        erro, 
        sucesso 
    } = useAluguel();

    const [idManual, setIdManual] = useState('');

    const realizarTesteDeFluxo = async () => {
        if (!idManual) {
            alert("Por favor, insira o ID que funcionou no Postman");
            return;
        }

        const dadosChecklist = {
            estruturaOk: true,
            lonaLimpa: true,
            observacoes: "Teste de fluxo via Hook"
        };

        // Arquivo simulado
        const fotoTeste = new File(["teste"], "foto_hook.jpg", { type: "image/jpeg" });
        const arquivos = [fotoTeste];

        console.log("🔄 Chamando processarChecklist do Hook...");
        
        try {
            const resultado = await processarChecklist(idManual, dadosChecklist, arquivos, 'retirar');
            console.log("✅ Sucesso no Hook! Retorno:", resultado);
        } catch (err) {
            console.error("❌ O Hook capturou um erro:", err);
        }
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">🧪 Debug de Hook: useAluguel</h2>
                
                <div className="space-y-4">
                    <input 
                        className="w-full p-2 border rounded"
                        placeholder="ID do Aluguel (UUID)"
                        value={idManual}
                        onChange={(e) => setIdManual(e.target.value)}
                    />

                    <button 
                        onClick={realizarTesteDeFluxo}
                        disabled={loading}
                        className={`w-full py-3 rounded font-bold text-white transition-colors ${
                            loading ? 'bg-orange-400' : 'bg-green-600 hover:bg-green-700'
                        }`}
                    >
                        {loading ? 'EXECUTANDO HOOK...' : 'TESTAR HOOK'}
                    </button>

                    {/* MONITOR DE ESTADOS DO HOOK */}
                    <div className="mt-6 p-4 bg-black text-green-400 rounded-md font-mono text-sm">
                        <p className="mb-2 text-gray-400 border-b border-gray-700 pb-1 uppercase text-xs">
                            Estado Interno do Hook:
                        </p>
                        <p>loading: <span className={loading ? "text-orange-400" : "text-green-400"}>{loading ? "true" : "false"}</span></p>
                        <p>sucesso: <span>{sucesso ? "true" : "false"}</span></p>
                        <p className="break-words">erro: <span className="text-red-400">{erro || "null"}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TesteHook;