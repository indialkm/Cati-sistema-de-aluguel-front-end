import React, { useEffect, useState } from 'react'; // Adicionado useState
import { useParams } from 'react-router-dom';
import useAluguel from '../hooks/useAluguel';
import AdminLayout from '../../../components/AdminLayout/AdminLayout';
import StatusSelector from '../components/StatusSelector';
import InfoAluguelCard from '../components/InfoAluguelCard';
import MenuChecklist from '../../checklist/components/MenuChecklist';

const DetalhesAluguelOwnerPage = () => {
    const { id } = useParams();
    
    // Estados para controlar o Modal de Checklist
    const [modalAberto, setModalAberto] = useState(false);
    const [tipoAcao, setTipoAcao] = useState(''); 

  const {
        aluguelSelecionado,
        loading,
        obterPorId,
        alterarStatus,
        processarChecklist 
    } = useAluguel();


    const handleConfirmarVistoria = async (dadosChecklist, arquivos) => {
        const endpoint = tipoAcao === 'montar' ? 'montar' : 'retirar';

        try {
           
            await processarChecklist(id, dadosChecklist, arquivos, endpoint);
            
            alert("Vistoria realizada com sucesso!");
            setModalAberto(false); 
            obterPorId(id); 
        } catch (err) {
            console.error("Erro na vistoria:", err);
        }
    };

    useEffect(() => {
        if (id && id !== 'undefined') {
            obterPorId(id);
        }
    }, [id, obterPorId]);

    const handleMudarStatus = async (nomeDaAcao) => {
        const sucesso = await alterarStatus(id, nomeDaAcao);
        if (sucesso) {
            obterPorId(id);
            alert("Status atualizado!");
        }
    };

    // Função para disparar a abertura do checklist
    const abrirChecklist = (acao) => {
        setTipoAcao(acao);
        setModalAberto(true);
    };

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                <div className="lg:col-span-2">
                    <InfoAluguelCard aluguel={aluguelSelecionado} />
                    
                    {/* Botões de Ação de Vistoria */}
                    <div className="mt-4 flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                        <button 
                            onClick={() => abrirChecklist('montar')}
                            className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
                        >
                            Realizar Checklist de Montagem
                        </button>
                        <button 
                            onClick={() => abrirChecklist('retirar')}
                            className="bg-amber-600 text-white px-4 py-2 rounded font-bold hover:bg-amber-700"
                        >
                            Realizar Checklist de Retirada
                        </button>
                    </div>
                </div>

                <div>
                    <StatusSelector
                        statusAtual={aluguelSelecionado?.status}
                        onStatusChange={handleMudarStatus}
                        loading={loading}
                    />
                </div>
            </div>

            {/* Renderização condicional do Modal */}
            {modalAberto && (
                <MenuChecklist 
                    idAluguel={id}
                    acao={tipoAcao}
                    onConfirmar={handleConfirmarVistoria} // Passa a função de envio
                    onClose={() => setModalAberto(false)}
                    loading={loading}
                />
            )}
        </AdminLayout>
    );
};

export default DetalhesAluguelOwnerPage;