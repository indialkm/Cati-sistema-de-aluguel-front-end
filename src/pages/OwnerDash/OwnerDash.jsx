import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";

const STATUS_OPCOES = [
  "AGUARDANDO", "MONTAGEM", "MONTADA", "RETIRADA", "CONFERENCIA", 
  "FINALIZADO", "AVARIADO", "CANCELADO"
];

export default function OwnerDash() {
  const [filtros, setFiltros] = useState([]);
  const [alugueis, setAlugueis] = useState([]);
  const navigate = useNavigate();

  // --- FUNÇÕES DE LÓGICA ---
  
  const handleCheckboxChange = (status) => {
    if (filtros.includes(status)) {
      setFiltros(filtros.filter(s => s !== status));
    } else {
      setFiltros([...filtros, status]);
    }
  };

  const aplicarFiltro = () => {
    // Monta a query string: ?status=MONTAGEM&status=MONTADA...
    const queryParams = filtros.map(s => `status=${s}`).join('&');
    
    api.get(`/alugueis/filtrar?${queryParams}`)
      .then(res => {
        // No Spring Boot Pageable, os dados ficam em res.data.content
        setAlugueis(res.data.content || []);
      })
      .catch(err => {
        console.error("Erro ao filtrar:", err);
        alert("Erro ao buscar dados do servidor.");
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h3>Painel do Proprietário - Filtros</h3>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {STATUS_OPCOES.map(status => (
          <label key={status} style={badgeStyle}>
            <input 
              type="checkbox" 
              checked={filtros.includes(status)}
              onChange={() => handleCheckboxChange(status)} 
            />
            {status}
          </label>
        ))}
      </div>
      
      <button onClick={aplicarFiltro} style={btnSearch}>
        🔍 Filtrar Aluguéis
      </button>

      <hr style={{ margin: '30px 0', border: '0.5px solid #eee' }} />

      <div style={{ display: 'grid', gap: '15px' }}>
        {alugueis.length > 0 ? (
          alugueis.map(item => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/owner/aluguel/${item.id}`)} 
              style={cardStyleOwner}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '18px' }}>{item.nomeProduto}</strong>
                <span style={statusLabel}>{item.status}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#666', margin: '10px 0' }}>
                ID da Transação: {item.id}
              </p>
              <small style={{ color: '#f27405', fontWeight: 'bold' }}>
                Gerenciar etapas e checklist →
              </small>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '40px' }}>
            <p>Selecione os status acima e clique em filtrar para ver os aluguéis.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- ESTILOS (DEFINIDOS UMA ÚNICA VEZ) ---

const badgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 12px',
    backgroundColor: '#f4f4f4',
    borderRadius: '20px',
    border: '1px solid #ddd',
    cursor: 'pointer',
    fontSize: '13px'
};

const btnSearch = {
    backgroundColor: '#f27405',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    cursor: 'pointer',
    width: '100%'
};

const cardStyleOwner = {
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: '#fff',
    boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    borderLeft: '6px solid #f27405',
    transition: 'transform 0.1s'
};

const statusLabel = {
    backgroundColor: '#fff3e0',
    color: '#f27405',
    padding: '4px 10px',
    borderRadius: '5px',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase'
};