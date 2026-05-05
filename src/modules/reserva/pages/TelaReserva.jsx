import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, ArrowRight, Sidebar } from 'lucide-react';
import api from '../../../services/api';
import CalendarioReserva from '../components/CalendarioReserva/CalendarioReserva';
import Navbar from '../../../components/Navbar/Navbar';

export default function TelaReserva() {
  const location = useLocation();
  const navigate = useNavigate();
  const idEstoque = location.state?.idEstoque;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datasBloqueadas, setDatasBloqueadas] = useState([]);

  useEffect(() => {
    if (idEstoque) {
      api.get(`/reserva/estoque/${idEstoque}/datas-bloqueadas`)
        .then(res => setDatasBloqueadas(res.data.map(d => new Date(d.inicio))))
        .catch(err => console.error("Erro ao buscar bloqueios", err));
    }
  }, [idEstoque]);

  const handleAvancar = async () => {
    if (!startDate || !endDate) return alert("Selecione o período!");
    try {
      const response = await api.post("/reserva/adicionar", {
        idEstoque,
        dataInicial: startDate.toISOString(),
        dataFinal: endDate.toISOString()
      });
      navigate('/endereco', {
        state: {
          idReserva: response.data.id,
          ...location.state,
          dataInicial: startDate.toISOString(),
          dataFinal: endDate.toISOString()
        }
      });
    } catch (err) {
      alert(err.response?.data?.message || "Erro na reserva.");
    }
  };

  return (
    <>
    <Navbar/>
      <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
        <div className="w-full text-center space-y-6 flex flex-col items-center">

          <div className="inline-flex p-3 bg-blue-100 rounded-full text-blue-600 mb-2">
            <CalendarDays size={32} />
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
            Período da Reserva
          </h2>

          <p className="text-gray-500 max-w-md mx-auto">
            Selecione a data de retirada e devolução no calendário abaixo.
          </p>

          {/* CARD BRANCO: O segredo é o inline-block e p-4 */}
          <div className="inline-block bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 mx-auto mt-4 transition-all">
            <CalendarioReserva
              startDate={startDate}
              endDate={endDate}
              datasBloqueadas={datasBloqueadas}
              onChange={(dates) => {
                const [start, end] = dates;
                setStartDate(start);
                setEndDate(end);
              }}
            />
          </div>

          <div className="pt-8 w-full max-w-xs">
            <button
              onClick={handleAvancar}
              className="group flex items-center justify-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-blue-200"
            >
              Confirmar e Continuar
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}