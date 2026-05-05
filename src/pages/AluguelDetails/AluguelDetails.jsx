import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../services/api";

export default function AluguelDetails() {
    const { id } = useParams();
    const [aluguel, setAluguel] = useState(null);
    const [statusSelecionado, setStatusSelecionado] = useState("");
    
    // Estados para o Checklist
    const [urlMidia, setUrlMidia] = useState("");
    const [observacao, setObservacao] = useState("");

    const OPCOES_STATUS = [
        { label: "Em Montagem", path: "status-montagem" },
        { label: "Montada", path: "status-montada" },
        { label: "Retirada", path: "status-retirada" },
        { label: "Em Conferência", path: "status-conferencia" },
        { label: "Finalizado", path: "status-finalizado" },
        { label: "Avariado", path: "status-avariado" },
        { label: "Cancelado", path: "status-cancelado" }
    ];

    useEffect(() => {
        api.get(`/alugueis/${id}`).then(res => setAluguel(res.data));
    }, [id]);

    const handleAtualizarStatus = () => {
        if (!statusSelecionado) {
            alert("Selecione um status!");
            return;
        }
        api.patch(`/alugueis/${id}/${statusSelecionado}`)
            .then(res => {
                setAluguel(res.data);
                alert("Status atualizado!");
            })
            .catch(err => alert("Erro ao atualizar status."));
    };

    // Função para Salvar Checklist (Entrada ou Saída)
    const handleSalvarChecklist = (tipo) => {
        if (!urlMidia) return alert("Insira a URL da foto ou vídeo!");

        const payload = {
            aluguelId: id,
            urlFoto: urlMidia, // Ajuste para bater com seu ChecklistRequest DTO
            observacoes: observacao
        };

        const endpoint = tipo === 'saida' ? 'checkout' : 'checking';

        api.patch(`/alugueis/${id}/${endpoint}`, payload)
            .then(() => {
                alert(`Checklist de ${tipo} salvo com sucesso!`);
                setUrlMidia("");
                setObservacao("");
            })
            .catch(err => console.error(err));
    };

    if (!aluguel) return <p>Carregando...</p>;

    return (
        <div style={containerStyle}>
            <h2>Gerenciamento do Aluguel</h2>
            
            <div style={infoBox}>
                <p><strong>Produto:</strong> {aluguel.nomeProduto}</p>
                <p><strong>Status Atual:</strong> <span style={statusAtualStyle}>{aluguel.status}</span></p>
            </div>

            {/* SEÇÃO 1: MUDANÇA DE STATUS */}
            <div style={sectionStyle}>
                <h3>1. Atualizar Etapa</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select 
                        value={statusSelecionado} 
                        onChange={(e) => setStatusSelecionado(e.target.value)}
                        style={selectStyle}
                    >
                        <option value="">-- Selecione --</option>
                        {OPCOES_STATUS.map(opcao => (
                            <option key={opcao.path} value={opcao.path}>{opcao.label}</option>
                        ))}
                    </select>
                    <button onClick={handleAtualizarStatus} style={btnUpdate}>Atualizar</button>
                </div>
            </div>

            {/* SEÇÃO 2: CHECKLIST (FOTOS/VÍDEOS) */}
            <div style={sectionStyle}>
                <h3>2. Checklist (Mídia e Observações)</h3>
                <input 
                    type="text" 
                    placeholder="URL da Foto ou Vídeo (Postman Test)" 
                    value={urlMidia}
                    onChange={(e) => setUrlMidia(e.target.value)}
                    style={inputStyle}
                />
                <textarea 
                    placeholder="Observações sobre o estado do equipamento..."
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    style={{ ...inputStyle, height: '60px', marginTop: '10px' }}
                />
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button onClick={() => handleSalvarChecklist('saida')} style={btnChecklist}>
                        📤 Registrar Saída (Checkout)
                    </button>
                    <button onClick={() => handleSalvarChecklist('entrada')} style={btnChecklistIn}>
                        📥 Registrar Entrada (Checkin)
                    </button>
                </div>
            </div>
        </div>
    );
}

// Estilos Adicionais
const containerStyle = { padding: '30px', fontFamily: 'Arial', maxWidth: '600px' };
const infoBox = { padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginBottom: '20px', borderLeft: '5px solid #f27405' };
const sectionStyle = { marginBottom: '30px', padding: '15px', border: '1px solid #eee', borderRadius: '8px' };
const selectStyle = { padding: '10px', borderRadius: '5px', border: '1px solid #ccc', flex: 1 };
const inputStyle = { width: '95%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' };
const btnUpdate = { backgroundColor: '#f27405', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const btnChecklist = { backgroundColor: '#4A90E2', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 };
const btnChecklistIn = { backgroundColor: '#2ECC71', color: 'white', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', flex: 1 };
const statusAtualStyle = { color: '#f27405', fontWeight: 'bold' };